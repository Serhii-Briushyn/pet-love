import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CurrentFullResponse, CurrentResponse } from "types/users/responses";
import { EditRequest } from "types/users/requests";

export const goItApi = axios.create({
  baseURL: "https://petlove.b.goit.study/api/",
});

// -------------------- getCurrentUser --------------------

export const getCurrentUser = createAsyncThunk<
  CurrentResponse,
  void,
  { rejectValue: string }
>("users/current", async (_, thunkAPI) => {
  try {
    const res = await goItApi.get<CurrentResponse>("/users/current");
    return res.data;
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

    return thunkAPI.rejectWithValue("Failed to fetch user data.");
  }
});

// -------------------- getCurrentUserFull --------------------

export const getCurrentUserFull = createAsyncThunk<
  CurrentFullResponse,
  void,
  { rejectValue: string }
>("users/current/full", async (_, thunkAPI) => {
  try {
    const res = await goItApi.get<CurrentFullResponse>("/users/current/full");
    return res.data;
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

    return thunkAPI.rejectWithValue("Failed to fetch full user data.");
  }
});

// -------------------- updateUserProfile --------------------

export const updateUserProfile = createAsyncThunk<
  CurrentFullResponse,
  EditRequest,
  { rejectValue: string }
>("users/editProfile", async (userData, thunkAPI) => {
  try {
    const res = await goItApi.patch<CurrentFullResponse>(
      "/users/current/edit",
      userData
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 400) {
        return thunkAPI.rejectWithValue(
          "Invalid input. Please check all fields."
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

    return thunkAPI.rejectWithValue("Failed to update profile.");
  }
});
