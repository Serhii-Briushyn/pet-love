import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux"
import { useRef } from "react"
import toast from "react-hot-toast"

import { AppDispatch } from "@store/store"
import { selectUser } from "@store/users/selectors"
import { updateUserProfile } from "@store/users/operations"
import { closeModal } from "@store/ui/slice"

import { editValidationSchema } from "@validation/schemas"
import { uploadAvatarToCloudinary } from "@utils/cloudinary"
import { DEFAULT_AVATAR_URL } from "@constants/defaultAvatarUrl"
import { EditRequest } from "@store/users/types"

export const useEditUserForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector(selectUser)
  const fileRef = useRef<File | null>(null)

  const form = useForm({
    resolver: yupResolver(editValidationSchema),
    mode: "onTouched",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      avatar: user?.avatar || "",
    },
  })

  const { watch, setValue, reset, handleSubmit } = form

  const isChanged = Object.entries(watch()).some(
    ([key, value]) => value !== user?.[key as keyof EditRequest],
  )

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    fileRef.current = file
    const previewUrl = URL.createObjectURL(file)
    setValue("avatar", previewUrl, { shouldTouch: true })
  }

  const handleRemoveAvatar = () => {
    setValue("avatar", DEFAULT_AVATAR_URL, {
      shouldTouch: true,
      shouldValidate: true,
    })
    fileRef.current = null
  }

  const onSubmit = async (data: EditRequest) => {
    if (!user) return

    const updatedFields = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value && value !== user[key as keyof EditRequest],
      ),
    )

    try {
      if (fileRef.current) {
        const url = await uploadAvatarToCloudinary(fileRef.current, user._id)
        updatedFields.avatar = url
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

  return {
    ...form,
    isChanged,
    handleImageChange,
    handleRemoveAvatar,
    onSubmit: handleSubmit(onSubmit),
  }
}
