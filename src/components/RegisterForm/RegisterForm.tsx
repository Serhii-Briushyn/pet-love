import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import Title from "components/Title/Title";
import FormInput from "components/FormInput/FormInput";
import PasswordInput from "components/PasswordInput/PasswordInput";
import { SignUpRequest } from "types/auth/requests";
import { AppDispatch } from "store/store";
import { register } from "store/auth/operations";
import FormButton from "components/FormButton/FormButton";
import FormLink from "components/FormLink/FormLink";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),

  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please enter a valid email address"
    )
    .required("Email is required"),

  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .max(64, "Password must be at most 64 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const onSubmit = async (
    values: SignUpRequest & { confirmPassword?: string }
  ) => {
    try {
      const requestData = { ...values };
      delete requestData.confirmPassword;
      await dispatch(register(requestData)).unwrap();
      toast.success("Registration successful");
      reset();
    } catch (error) {
      toast.error(error as string);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="bg-white flex items-center justify-center rounded-main max-tablet:p-5 max-desktop:p-7 desktop:basis-box">
      <div className="w-full tablet:w-[424px]">
        <div className="flex flex-col gap-3 mb-5 tablet:gap-4 tablet:mb-8">
          <Title page="register" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="w-full mb-3 tablet:mb-4"
        >
          <div className="flex flex-col gap-2.5 mb-6 tablet:gap-4 tablet:mb-8">
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

        <FormLink
          to="/login"
          text="Already have an account?"
          linkText="Login"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
