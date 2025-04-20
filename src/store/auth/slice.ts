import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "./operations";
import { AuthState } from "types/auth/state";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
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
        state.isError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = action.payload ?? "Something went wrong";
      });

    // -------------------- login --------------------
    builder
      .addCase(login.pending, (state) => {
        state.isError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = action.payload ?? "Something went wrong";
      });

    // -------------------- logout --------------------
    builder
      .addCase(logout.pending, (state) => {
        state.isError = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.token = null;
        state.isError = action.payload ?? "Something went wrong";
      });
  },
});

export const authReducer = userSlice.reducer;
