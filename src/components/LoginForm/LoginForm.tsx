import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { yupResolver } from "@hookform/resolvers/yup"

import { AppDispatch } from "@store/store"
import { login } from "@store/users/operations"
import { loginValidationSchema } from "@validation/schemas"

import Title from "@components/Title/Title"
import FormInput from "@components/FormInput/FormInput"
import PasswordInput from "@components/PasswordInput/PasswordInput"
import FormButton from "@components/FormButton/FormButton"
import FormLink from "@components/FormLink/FormLink"

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: "onTouched",
  })

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await dispatch(login(values)).unwrap()
      toast.success("Login successful")
      reset()
    } catch (error) {
      toast.error(error as string)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="dark:bg-dark-secondary flex items-center justify-center rounded-4xl bg-white px-5 py-15 lg:p-17 xl:flex-1/2 xl:p-0">
      <div className="w-full lg:w-106">
        <Title
          title="Log in"
          subtitle="Welcome! Please enter your credentials to login to the platform:"
          className="mb-6 flex flex-col gap-3 lg:mb-8 lg:gap-4"
        />

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="mb-3 w-full lg:mb-4">
          <div className="mb-10 flex flex-col gap-2.5 lg:mb-16 lg:gap-4">
            <FormInput
              type="email"
              placeholder="Email"
              autoComplete="email"
              error={errors.email?.message}
              touched={touchedFields.email}
              value={watch("email")}
              {...register("email")}
            />

            <PasswordInput
              placeholder="Password"
              autoComplete="password"
              error={errors.password?.message}
              touched={touchedFields.password}
              show={showPassword}
              toggle={togglePasswordVisibility}
              value={watch("password")}
              {...register("password")}
            />
          </div>
          <FormButton type="submit" disabled={isSubmitting}>
            Log In
          </FormButton>
        </form>

        <FormLink to="/register" text="Don't have an account?" linkText="Register" />
      </div>
    </div>
  )
}

export default LoginForm
