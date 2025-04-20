import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import * as Yup from "yup";

import { AppDispatch } from "store/store";
import { login } from "store/auth/operations";
import Title from "components/Title/Title";
import FormInput from "components/FormInput/FormInput";
import PasswordInput from "components/PasswordInput/PasswordInput";
import FormButton from "components/FormButton/FormButton";
import FormLink from "components/FormLink/FormLink";

const validationSchema = Yup.object({
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
});

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await dispatch(login(values)).unwrap();
      toast.success("Login successful");
      reset();
    } catch (error) {
      toast.error(error as string);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="bg-white flex items-center justify-center rounded-main max-tablet:px-5 max-tablet:py-15 max-desktop:px-7 max-desktop:py-18 desktop:basis-box">
      <div className="w-full tablet:w-[424px]">
        <div className="flex flex-col gap-3 mb-6 tablet:gap-4 tablet:mb-8">
          <Title page="login" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="w-full mb-3 tablet:mb-4"
        >
          <div className="flex flex-col gap-2.5 mb-10 tablet:gap-4 tablet:mb-16">
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
          <FormButton type="submit" disabled={isSubmitting}>
            Log In
          </FormButton>
        </form>

        <FormLink
          to="/register"
          text="Don't have an account?"
          linkText="Register"
        />
      </div>
    </div>
  );
};

export default LoginForm;
