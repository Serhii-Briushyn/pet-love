import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { goItApi } from "store/auth/operations";
import { FriendsResponse } from "types/friends/types";

export const fetchFriends = createAsyncThunk<
  FriendsResponse[],
  void,
  { rejectValue: string }
>("friends/fetchFriends", async (_, thunkAPI) => {
  try {
    const res = await goItApi.get("/friends");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 404) {
        return thunkAPI.rejectWithValue("Friends not found.");
      } else if (statusCode === 500) {
        return thunkAPI.rejectWithValue(
          "Oops! Something went wrong. Please try again."
        );
      }
    }
    return thunkAPI.rejectWithValue("Failed to fetch friends.");
  }
});
