import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { yupResolver } from "@hookform/resolvers/yup"

import { uploadImageToCloudinary } from "@utils/cloudinary"
import { editUserValidationSchema } from "@validation/schemas"
import { AppDispatch } from "@store/store"
import { updateUserProfile } from "@store/users/operations"
import { selectUser } from "@store/users/selectors"
import { EditRequest } from "@store/users/types"
import { closeModal } from "@store/ui/slice"

import FormButton from "@components/FormButton/FormButton"
import FormInput from "@components/FormInput/FormInput"
import ImageUploader from "@components/ImageUploader/ImageUploader"
import { DEFAULT_AVATAR_URL } from "@constants/defaultUserData"

const ModalEditUser = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectUser)
  const fileRef = useRef<File | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(editUserValidationSchema),
    mode: "onTouched",
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      avatar: user?.avatar || "",
    },
  })

  const isChanged = Object.entries(watch()).some(
    ([key, value]) => value !== user?.[key as keyof EditRequest],
  )

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    fileRef.current = file
    const previewUrl = URL.createObjectURL(file)
    setValue("avatar", previewUrl, { shouldTouch: true, shouldValidate: true })
  }

  const onSubmit = async (data: EditRequest) => {
    if (!user) return
    const updatedFields = {
      ...data,
      avatar: !data.avatar || data.avatar.trim() === "" ? DEFAULT_AVATAR_URL : data.avatar,
    }
    try {
      if (fileRef.current) {
        const avatar = await uploadImageToCloudinary(fileRef.current)
        updatedFields.avatar = avatar
      }
      await dispatch(updateUserProfile(updatedFields)).unwrap()
      toast.success("Updated successfully")
      reset({ ...user, ...updatedFields })
      dispatch(closeModal())
      fileRef.current = null
    } catch (error) {
      toast.error(error as string)
    }
  }

  return (
    <div className="flex flex-col items-center rounded-4xl bg-white px-5 py-10 sm:w-83 lg:w-120 lg:p-12.5">
      <h3 className="mb-6 text-lg font-bold">Edit information</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex w-full flex-col gap-4"
      >
        <ImageUploader
          fileUrl={watch("avatar") || null}
          onFileChange={handleAvatarChange}
          error={errors.avatar}
          {...register("avatar")}
        />
        <FormInput
          type="text"
          placeholder="Name"
          autoComplete="name"
          error={errors.name}
          touched={touchedFields.name}
          successMessage="Name looks good"
          value={watch("name")}
          {...register("name")}
        />

        <FormInput
          type="email"
          placeholder="Email"
          autoComplete="email"
          error={errors.email}
          touched={touchedFields.email}
          successMessage="Email is valid"
          value={watch("email")}
          {...register("email")}
        />

        <FormInput
          type="tel"
          placeholder="+380"
          autoComplete="tel"
          error={errors.phone}
          touched={touchedFields.phone}
          successMessage="Phone number is valid"
          value={watch("phone")}
          {...register("phone")}
        />

        <FormButton type="submit" disabled={isSubmitting || !isChanged}>
          Save
        </FormButton>
      </form>
    </div>
  )
}

export default ModalEditUser
