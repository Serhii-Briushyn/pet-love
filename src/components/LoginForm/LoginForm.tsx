import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Title from "components/Title/Title"

import { useForm } from "react-hook-form"
import { AppDispatch } from "store/store"
import { selectIsLoading } from "store/auth/selectors"
import { login } from "store/auth/operations"
import FormInput from "components/FormInput/FormInput"
import PasswordInput from "components/PasswordInput/PasswordInput"

const validationSchema = Yup.object({
  email: Yup.string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .max(64, "Password must be at most 64 characters")
    .required("Password is required"),
})

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isLoading = useSelector(selectIsLoading)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  })

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await dispatch(login(values)).unwrap()
      toast.success("Login successful")
      reset()
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Login failed")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      {isLoading && <div>loading</div>}
      <div className="rounded-main max-desktop:px-7 max-desktop:py-18 desktop:basis-section max-tablet:px-5 max-tablet:py-15 flex items-center justify-center bg-white">
        <div className="tablet:w-[424px] w-full">
          <Title page="login" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="tablet:text-base tablet:mb-4 mb-3 w-full text-sm"
          >
            <div className="tablet:gap-4 tablet:mb-16 mb-10 flex flex-col gap-2.5">
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
            </div>
            <button
              className="bg-primary rounded-main tablet:p-4 hover:bg-primary-hover tablet:text-base flex w-full cursor-pointer justify-center p-3 text-sm/tight font-bold text-white uppercase transition-all duration-200 ease-in"
              type="submit"
              disabled={isSubmitting}
            >
              Log In
            </button>
          </form>

          <p className="tablet:text-sm text-center text-xs text-black/50">
            Already have an account?{" "}
            <NavLink
              className="text-primary hover:text-primary-hover font-bold underline transition-all duration-200 ease-in"
              to="/register"
            >
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginForm
