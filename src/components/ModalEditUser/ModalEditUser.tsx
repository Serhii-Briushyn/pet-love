import { useEditUserForm } from "@hooks/useEditUserForm"
import FormButton from "@components/FormButton/FormButton"
import FormInput from "@components/FormInput/FormInput"
import AvatarUploader from "@components/AvatarUploader/AvatarUploader"

const ModalEditUser = () => {
  const {
    register,
    watch,
    formState: { errors, touchedFields, isSubmitting },
    handleImageChange,
    handleRemoveAvatar,
    onSubmit,
    isChanged,
  } = useEditUserForm()

  return (
    <div className="flex flex-col items-center rounded-4xl bg-white px-5 py-10 sm:w-83 lg:w-120 lg:p-12.5">
      <h3 className="mb-6 text-lg font-bold">Edit information</h3>

      <form onSubmit={onSubmit} autoComplete="off" className="flex w-full flex-col gap-4">
        <AvatarUploader
          avatarUrl={watch("avatar") ?? null}
          onChange={handleImageChange}
          onRemove={handleRemoveAvatar}
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
