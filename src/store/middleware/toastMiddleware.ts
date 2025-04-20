import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const toastMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMessage =
      typeof action.payload === "string"
        ? action.payload
        : "Oops! Something went wrong. Please try again.";

    toast.error(errorMessage);
  }

  return next(action);
};
