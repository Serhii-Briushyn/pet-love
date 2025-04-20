import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsState } from "types/news/state";
import { fetchNews } from "./operations";

const initialState: NewsState = {
  items: [],
  totalPages: 1,
  page: 1,
  isError: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isError = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.items = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isError = action.payload as string;
      });
  },
});

export const { setPage } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
