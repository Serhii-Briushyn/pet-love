import { createSlice } from "@reduxjs/toolkit";
import { FriendsState } from "types/friends/state";
import { fetchFriends } from "./operations";

const initialState: FriendsState = {
  items: [],
  isError: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.isError = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.isError = action.payload as string;
      });
  },
});

export const friendsReducer = friendsSlice.reducer;
