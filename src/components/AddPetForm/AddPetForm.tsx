import { useRef } from "react"
import { useDispatch } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { yupResolver } from "@hookform/resolvers/yup"
import { format } from "date-fns"
import clsx from "clsx"

import { AppDispatch } from "@store/store"
import { addPet } from "@store/users/operations"
import { AddPetRequest } from "@store/users/types"

import { speciesOptions } from "@constants/speciesOptions"
import { addPetValidationSchema } from "@validation/schemas"
import { uploadImageToCloudinary } from "@utils/cloudinary"

import ImageUploader from "@components/ImageUploader/ImageUploader"
import FormInput from "@components/FormInput/FormInput"
import DateInput from "@components/DateInput/DateInput"
import DropdownSelect from "@components/DropdownSelect/DropdownSelect"
import GenderSelector from "@components/GenderSelector/GenderSelector"

const AddPetForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const fileRef = useRef<File | null>(null)
  const navigate = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, touchedFields },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(addPetValidationSchema),
    mode: "onTouched",
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    fileRef.current = file
    const previewUrl = URL.createObjectURL(file)
    setValue("imgURL", previewUrl, { shouldTouch: true, shouldValidate: true })
  }

  const onSubmit = async (values: AddPetRequest) => {
    try {
      let imgURL = values.imgURL
      if (fileRef.current) {
        imgURL = await uploadImageToCloudinary(fileRef.current)
      }
      const petData = {
        ...values,
        imgURL,
        birthday: format(values.birthday, "yyyy-MM-dd"),
      }
      await dispatch(addPet(petData)).unwrap()
      toast.success("Pet added successfully")
      reset()
      fileRef.current = null
      navigate("/profile")
    } catch (error) {
      toast.error(error as string)
    }
  }

  const baseButtonClass =
    "flex h-full flex-1/2 items-center justify-center rounded-4xl transition-all duration-200 ease-in font-bold"

  return (
    <div className="dark:bg-dark-secondary flex items-center justify-center rounded-4xl bg-white p-5 pt-7 lg:p-10 xl:flex-1/2 xl:p-0">
      <div className="flex w-full flex-col gap-6 lg:max-w-108 lg:gap-10">
        <div className="flex items-end gap-2">
          <h3 className="text-[28px] leading-none font-bold tracking-tight lg:text-[32px]">
            Add my pet /
          </h3>
          <p className="font-bold text-black/40 dark:text-white/40">Personal details</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="mb-8 flex flex-col gap-2.5 lg:relative lg:mb-10 lg:gap-4.5 lg:pt-6">
            <GenderSelector
              value={watch("sex")}
              error={errors.sex?.message}
              touched={touchedFields.sex}
              {...register("sex")}
            />

            <ImageUploader
              fileUrl={watch("imgURL")}
              onFileChange={handleImageChange}
              error={errors.imgURL?.message}
              {...register("imgURL")}
            />
            <FormInput
              type="text"
              placeholder="Title"
              error={errors.title?.message}
              touched={touchedFields.title}
              value={watch("title")}
              {...register("title")}
            />
            <FormInput
              type="text"
              placeholder="Pet's Name"
              error={errors.name?.message}
              touched={touchedFields.name}
              value={watch("name")}
              {...register("name")}
            />
            <div className="flex h-10.5 w-full gap-2 lg:h-13 lg:gap-3">
              <Controller
                name="birthday"
                control={control}
                rules={{ required: "Birthday is required" }}
                render={({ field }) => (
                  <DateInput
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.birthday?.message}
                  />
                )}
              />
              <Controller
                name="species"
                control={control}
                rules={{ required: "Species is required" }}
                render={({ field }) => (
                  <DropdownSelect
                    variant="species"
                    placeholder="Type of pet"
                    value={field.value}
                    options={speciesOptions}
                    onChange={field.onChange}
                    error={errors.species?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="ml-auto flex h-10.5 max-w-52 gap-2 lg:h-12 lg:max-w-87">
            <NavLink
              to="/profile"
              className={clsx(
                baseButtonClass,
                "cursor-pointer border border-transparent bg-black/5 hover:bg-black/10 dark:bg-white/5 hover:dark:bg-white/10",
              )}
            >
              Back
            </NavLink>
            <button
              className={clsx(
                baseButtonClass,
                "bg-primary text-white",
                !isSubmitting && isValid
                  ? "hover:bg-primary-hover cursor-pointer"
                  : "cursor-not-allowed opacity-40",
              )}
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPetForm
