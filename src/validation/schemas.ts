import * as Yup from "yup"

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be at most 30 characters")
    .required("Name is required"),
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

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .max(64, "Password must be at most 64 characters")
    .required("Password is required"),
})

export const editValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be at most 30 characters")
    .required("Name is required"),
  email: Yup.string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Please enter a valid email address")
    .required("Email is required"),
  avatar: Yup.string().matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)|blob:.*)$/, {
    message: "Please enter a valid image format",
    excludeEmptyString: true,
  }),
  phone: Yup.string().matches(/^\+38\d{10}$/, {
    message: "Enter number in format +38XXXXXXXXXX",
    excludeEmptyString: true,
  }),
})
