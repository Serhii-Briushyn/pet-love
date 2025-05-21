import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CityOption, CityResponse } from "./types";
import { goItApi } from "@store/users/operations";

const handleAxiosError = (error: unknown, fallback = "Unknown error") => {
  if (axios.isAxiosError(error) && error.response) {
    const status = error.response.status;
    switch (status) {
      case 400:
        return "Invalid request query";
      case 404:
        return "Resource not found";
      case 500:
        return "Oops! Something went wrong. Please try again.";
    }
  }
  return fallback;
};

// -------------------- fetchCities --------------------

export const fetchCities = createAsyncThunk<
  CityOption[],
  void,
  { rejectValue: string }
>("cities/fetch", async (_, thunkAPI) => {
  try {
    const response = await goItApi.get("/cities/locations");
    return response.data.map(
      (city: CityResponse): CityOption => ({
        label: `${city.stateEn}, ${city.cityEn}`,
        value: city._id,
      })
    );
  } catch (error) {
    return thunkAPI.rejectWithValue(
      handleAxiosError(error, "Failed to fetch cities.")
    );
  }
});
