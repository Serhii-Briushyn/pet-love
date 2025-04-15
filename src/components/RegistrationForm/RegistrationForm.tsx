import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
// import { NavLink } from "react-router";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import Title from "components/Title/Title"

import { useForm } from "react-hook-form"
import { SignUpRequest } from "types/auth/requests"
import { AppDispatch } from "store/store"
import { selectIsLoading } from "store/auth/selectors"
import { register } from "store/auth/operations"
import FormInput from "components/FormInput/FormInput"
import PasswordInput from "components/PasswordInput/PasswordInput"
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),

  email: Yup.string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Please enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .max(64, "Password must be at most 64 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
})

const RegistrationForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isLoading = useSelector(selectIsLoading)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  const onSubmit = async (values: SignUpRequest & { confirmPassword?: string }) => {
    try {
      const requestData = { ...values }
      delete requestData.confirmPassword
      await dispatch(register(requestData)).unwrap()
      toast.success("Registration successful")
      reset()
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Registration failed")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  return (
    <>
      {isLoading && <div>loading</div>}
      <div className="rounded-main max-desktop:p-7 desktop:basis-section max-tablet:p-5 flex items-center justify-center bg-white">
        <div className="tablet:w-[424px] w-full">
          <Title page="registration" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="tablet:text-base tablet:mb-4 mb-3 w-full text-sm"
          >
            <div className="tablet:gap-4 mb-6 flex flex-col gap-2.5">
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
                placeholder="confirmPassword"
                error={errors.confirmPassword}
                touched={touchedFields.confirmPassword}
                show={showConfirmPassword}
                toggle={toggleConfirmPasswordVisibility}
                successMessage="Passwords match"
                value={watch("confirmPassword")}
                {...formRegister("confirmPassword")}
              />
            </div>
            <button
              className="bg-primary rounded-main tablet:p-4 hover:bg-primary-hover tablet:text-base flex w-full cursor-pointer justify-center p-3 text-sm font-bold text-white uppercase transition-all duration-200 ease-in"
              type="submit"
              disabled={isSubmitting}
            >
              Registration
            </button>
          </form>

          <p className="tablet:text-sm text-center text-xs text-black/50">
            Already have an account?
            {/* <NavLink  to="/#">"Login"</NavLink> */}
          </p>
        </div>
      </div>
    </>
  )
}

export default RegistrationForm
