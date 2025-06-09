import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchNews } from "./operations"
import { NewsState } from "./types"

const initialState: NewsState = {
  news: [],
  keyword: "",
  totalPages: 1,
  currentPage: 1,
  isError: null,
}

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload
      state.currentPage = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    resetKeyword(state) {
      state.keyword = ""
      state.currentPage = 1
    },
  },
  extraReducers: (builder) => {
    builder
      // -------------------- fetchNews --------------------
      .addCase(fetchNews.pending, (state) => {
        state.isError = null
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload.results
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isError = action.payload as string
      })
  },
})

export const { setKeyword, setPage, resetKeyword } = newsSlice.actions
export const newsReducer = newsSlice.reducer
