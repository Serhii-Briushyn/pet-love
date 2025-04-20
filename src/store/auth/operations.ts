import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInResponse, SignUpResponse } from "types/auth/responses";
import { SignInRequest, SignUpRequest } from "types/auth/requests";

export const goItApi = axios.create({
  baseURL: "https://petlove.b.goit.study/api/",
});

export const setAuthHeader = (token: string): void => {
  goItApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  goItApi.defaults.headers.common.Authorization = "";
};

// -------------------- register --------------------

export const register = createAsyncThunk<
  SignUpResponse,
  SignUpRequest,
  { rejectValue: string }
>("users/signup", async (credentials, thunkAPI) => {
  try {
    const res = await goItApi.post<SignUpResponse>(
      "/users/signup",
      credentials
    );
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 400) {
        return thunkAPI.rejectWithValue(
          "Invalid input. Please check your name, email and password."
        );
      } else if (statusCode === 404) {
        return thunkAPI.rejectWithValue("Service not found.");
      } else if (statusCode === 409) {
        return thunkAPI.rejectWithValue(
          "User with this email is already registered."
        );
      } else if (statusCode === 500) {
        return thunkAPI.rejectWithValue(
          "Oops! Something went wrong. Please try again."
        );
      }
    }

    return thunkAPI.rejectWithValue("Registration failed. Please try again.");
  }
});

// -------------------- login --------------------

export const login = createAsyncThunk<
  SignInResponse,
  SignInRequest,
  { rejectValue: string }
>("users/signin", async (credentials, thunkAPI) => {
  try {
    const res = await goItApi.post<SignInResponse>(
      "/users/signin",
      credentials
    );
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 400) {
        return thunkAPI.rejectWithValue(
          "Invalid input. Please check your name, email and password."
        );
      } else if (statusCode === 401) {
        return thunkAPI.rejectWithValue("Email or password is incorrect.");
      } else if (statusCode === 404) {
        return thunkAPI.rejectWithValue("Service not found.");
      } else if (statusCode === 500) {
        return thunkAPI.rejectWithValue(
          "Oops! Something went wrong. Please try again."
        );
      }
    }

    return thunkAPI.rejectWithValue("Login failed. Please try again.");
  }
});

// -------------------- logout --------------------

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "users/signout",
  async (_, thunkAPI) => {
    try {
      await goItApi.post("/users/signout");
      clearAuthHeader();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status;

        if (statusCode === 401) {
          return thunkAPI.rejectWithValue("Unauthorized. Please log in again.");
        } else if (statusCode === 404) {
          return thunkAPI.rejectWithValue("Service not found.");
        } else if (statusCode === 500) {
          return thunkAPI.rejectWithValue(
            "Oops! Something went wrong. Please try again."
          );
        }
      }

      return thunkAPI.rejectWithValue("Logout failed. Please try again.");
    }
  }
);
