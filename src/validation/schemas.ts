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

export const editUserValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be at most 30 characters")
    .required("Name is required"),
  email: Yup.string()
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Please enter a valid email address")
    .required("Email is required"),
  avatar: Yup.string().matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)|blob:.*)$/, {
    message: "URL must end with png, jpg, jpeg, gif, bmp or webp",
    excludeEmptyString: true,
  }),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\+38\d{10}$/, {
      message: "Enter number in format +38XXXXXXXXXX",
      excludeEmptyString: true,
    }),
})

export const addPetValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Name is required"),
  imgURL: Yup.string()
    .required("Image URL is required")
    .matches(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)|blob:.*)$/, {
      message: "URL must end with png, jpg, jpeg, gif, bmp or webp",
      excludeEmptyString: true,
    }),
  species: Yup.string()
    .required("Species is required")
    .oneOf(
      [
        "dog",
        "cat",
        "monkey",
        "bird",
        "snake",
        "turtle",
        "lizard",
        "frog",
        "fish",
        "ants",
        "bees",
        "butterfly",
        "spider",
        "scorpion",
      ],
      "Invalid species value",
    ),
  birthday: Yup.string()
    .required("Birthday is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Birthday must be in YYYY-MM-DD format"),
  sex: Yup.string()
    .required("Gender is required")
    .oneOf(["female", "male", "multiple"], "Invalid sex value"),
})
