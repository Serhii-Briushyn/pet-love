import { createSlice } from "@reduxjs/toolkit";
import { CitiesState } from "./types";
import { fetchCities } from "./operations";

const initialState: CitiesState = {
  cities: [],
  isError: null,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // -------------------- fetchCities --------------------
      .addCase(fetchCities.pending, (state) => {
        state.isError = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.isError = action.payload as string;
      });
  },
});

export const citiesReducer = citiesSlice.reducer;
