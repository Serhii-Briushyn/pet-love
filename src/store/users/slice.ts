import { createSlice } from "@reduxjs/toolkit"
import { register, login, logout, getCurrentUserFull, updateUserProfile } from "./operations"
import { UsersState } from "./types"
import { addToFavorites, removeFromFavorites } from "@store/notices/operations"

const initialState: UsersState = {
  user: null,
  favorites: [],
  viewed: [],
  token: localStorage.getItem("token"),
  favoritesIds: [],
  isLoggedIn: false,
  isError: null,
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // -------------------- register --------------------
    builder
      .addCase(register.pending, (state) => {
        state.isError = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.token = action.payload.token
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = action.payload as string
      })

    // -------------------- login --------------------
    builder
      .addCase(login.pending, (state) => {
        state.isError = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.token = action.payload.token
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = action.payload as string
      })

    // -------------------- logout --------------------
    builder
      .addCase(logout.pending, (state) => {
        state.isError = null
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, (state, action) => {
        state.token = null
        state.isError = action.payload as string
      })
    // -------------------- getCurrentUserFull --------------------
    builder
      .addCase(getCurrentUserFull.pending, (state) => {
        state.isError = null
      })
      .addCase(getCurrentUserFull.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.token = action.payload.token
        state.user = action.payload
        state.favorites = action.payload.noticesFavorites
        state.viewed = action.payload.noticesViewed
        const { noticesFavorites } = action.payload
        state.favoritesIds = noticesFavorites.map((notice) => notice._id)
      })
      .addCase(getCurrentUserFull.rejected, (state, action) => {
        state.isError = action.payload as string
      })
    builder
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favoritesIds = action.payload
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favoritesIds = action.payload
      })
    // -------------------- updateUserProfile --------------------
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isError = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isError = action.payload as string
      })
  },
})

export const usersReducer = userSlice.reducer
