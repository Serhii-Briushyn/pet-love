import { createSlice } from "@reduxjs/toolkit";
import { fetchFriends } from "./operations";
import { FriendsState } from "./types";

const initialState: FriendsState = {
  friends: [],
  isError: null,
};

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // -------------------- fetchFriends --------------------

      .addCase(fetchFriends.pending, (state) => {
        state.isError = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.isError = action.payload as string;
      });
  },
});

export const friendsReducer = friendsSlice.reducer;
