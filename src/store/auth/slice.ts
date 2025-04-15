import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "./operations";
import { AuthState } from "types/auth/state";

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  isLoggedIn: false,
  isError: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // -------------------- register --------------------
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload ?? "Something went wrong";
      });

    // -------------------- login --------------------
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload ?? "Something went wrong";
      });

    // -------------------- logout --------------------
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.token = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload ?? "Something went wrong";
      });
  },
});

export const authReducer = userSlice.reducer;
