import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { yupResolver } from "@hookform/resolvers/yup"

import { AppDispatch } from "@store/store"
import { register } from "@store/users/operations"
import { SignUpRequest } from "@store/users/types"
import { registerValidationSchema } from "@validation/schemas"

import Title from "@components/Title/Title"
import FormInput from "@components/FormInput/FormInput"
import PasswordInput from "@components/PasswordInput/PasswordInput"
import FormButton from "@components/FormButton/FormButton"
import FormLink from "@components/FormLink/FormLink"

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    mode: "onTouched",
  })

  const onSubmit = async (values: SignUpRequest & { confirmPassword?: string }) => {
    try {
      const requestData = { ...values }
      delete requestData.confirmPassword
      await dispatch(register(requestData)).unwrap()
      toast.success("Registration successful")
      reset()
    } catch (error) {
      toast.error(error as string)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  return (
    <div className="flex items-center justify-center rounded-4xl bg-white p-5 lg:p-7 xl:flex-1/2 xl:p-0">
      <div className="w-full lg:w-106">
        <Title
          title="Registration"
          subtitle="Thank you for your interest in our platform."
          className="mb-5 flex flex-col gap-3 lg:mb-8 lg:gap-4"
        />

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="mb-3 w-full lg:mb-4">
          <div className="mb-6 flex flex-col gap-2.5 lg:mb-8 lg:gap-4">
            <FormInput
              type="name"
              placeholder="Name"
              error={errors.name}
              touched={touchedFields.name}
              successMessage="Name looks good"
              value={watch("name")}
              {...formRegister("name")}
            />

            <FormInput
              type="email"
              placeholder="Email"
              error={errors.email}
              touched={touchedFields.email}
              successMessage="Email is valid"
              value={watch("email")}
              {...formRegister("email")}
            />

            <PasswordInput
              type="password"
              placeholder="Password"
              error={errors.password}
              touched={touchedFields.password}
              show={showPassword}
              toggle={togglePasswordVisibility}
              successMessage="Password is secure"
              value={watch("password")}
              {...formRegister("password")}
            />

            <PasswordInput
              type="confirmPassword"
              placeholder="Confirm password"
              error={errors.confirmPassword}
              touched={touchedFields.confirmPassword}
              show={showConfirmPassword}
              toggle={toggleConfirmPasswordVisibility}
              successMessage="Passwords match"
              value={watch("confirmPassword")}
              {...formRegister("confirmPassword")}
            />
          </div>

          <FormButton type="submit" disabled={isSubmitting}>
            Registration
          </FormButton>
        </form>

        <FormLink to="/login" text="Already have an account?" linkText="Login" />
      </div>
    </div>
  )
}

export default RegisterForm
