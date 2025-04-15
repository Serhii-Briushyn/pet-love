import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CurrentFullResponse } from "types/users/responses";
import { AddPetRequest } from "types/pets/types";

export const goItApi = axios.create({
  baseURL: "https://petlove.b.goit.study/api/",
});

// -------------------- addPet --------------------

export const addPet = createAsyncThunk<
  CurrentFullResponse,
  AddPetRequest,
  { rejectValue: string }
>("users/addPet", async (petData, thunkAPI) => {
  try {
    const res = await goItApi.post<CurrentFullResponse>(
      "/users/current/pets/add",
      petData
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
      } else if (statusCode === 500) {
        return thunkAPI.rejectWithValue(
          "Oops! Something went wrong. Please try again."
        );
      }
    }

    return thunkAPI.rejectWithValue("Failed to add pet. Please try again.");
  }
});

// -------------------- deletePet --------------------

export const deletePet = createAsyncThunk<
  CurrentFullResponse,
  string,
  { rejectValue: string }
>("users/deletePet", async (petId, thunkAPI) => {
  try {
    const res = await goItApi.delete<CurrentFullResponse>(
      `/users/current/pets/remove/${petId}`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 400) {
        return thunkAPI.rejectWithValue("Invalid pet ID.");
      } else if (statusCode === 404) {
        return thunkAPI.rejectWithValue("Pet not found.");
      } else if (statusCode === 409) {
        return thunkAPI.rejectWithValue("You are not the owner of this pet.");
      } else if (statusCode === 500) {
        return thunkAPI.rejectWithValue(
          "Oops! Something went wrong. Please try again."
        );
      }
    }

    return thunkAPI.rejectWithValue("Failed to delete pet.");
  }
});
