import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { goItApi } from "store/auth/operations";
import { NewsResponse } from "types/news/types";

export const fetchNews = createAsyncThunk<
  NewsResponse,
  { keyword?: string; page?: number; limit?: number },
  { rejectValue: string }
>("news/fetchNews", async ({ keyword = "", page = 1, limit = 6 }, thunkAPI) => {
  try {
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const res = await goItApi.get(`/news?${params.toString()}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 404) {
        return thunkAPI.rejectWithValue("News not found.");
      } else if (statusCode === 500) {
        return thunkAPI.rejectWithValue(
          "Oops! Something went wrong. Please try again."
        );
      }
    }
    return thunkAPI.rejectWithValue("Failed to fetch news.");
  }
});
