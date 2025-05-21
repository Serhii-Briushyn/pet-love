import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  fetchNotices,
  fetchNoticeById,
  addToFavorites,
  removeFromFavorites,
  fetchCategories,
  fetchSexOptions,
  fetchSpeciesOptions,
} from './operations'
import { NoticesState } from './types'

const initialState: NoticesState = {
  notices: [],
  selectedNotice: null,
  totalPages: 1,
  currentPage: 1,
  isError: null,
  filters: {
    keyword: '',
    category: '',
    sex: '',
    species: '',
    location: '',
  },
  sorting: null,
  categories: [],
  sexOptions: [],
  speciesOptions: [],
}

const noticesSlice = createSlice({
  name: 'notices',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
      state.currentPage = 1
    },
    setSorting(state, action) {
      state.sorting = action.payload
      state.currentPage = 1
    },
    resetFilters(state) {
      state.filters = initialState.filters
      state.currentPage = 1
    },
  },
  extraReducers: (builder) => {
    builder
      // -------------------- fetchNotices --------------------
      .addCase(fetchNotices.pending, (state) => {
        state.isError = null
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.notices = action.payload.results
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.isError = action.payload as string
      })
      // -------------------- fetchNoticeById --------------------
      .addCase(fetchNoticeById.pending, (state) => {
        state.isError = null
        state.selectedNotice = null
      })
      .addCase(fetchNoticeById.fulfilled, (state, action) => {
        const updatedNotice = action.payload
        state.selectedNotice = updatedNotice

        const index = state.notices.findIndex((notice) => notice._id === updatedNotice._id)

        if (index !== -1) {
          state.notices[index].popularity = updatedNotice.popularity // Обновляем только popularity
        }
      })
      .addCase(fetchNoticeById.rejected, (state, action) => {
        state.isError = action.payload as string
      })
      // -------------------- addToFavorites --------------------
      .addCase(addToFavorites.pending, (state) => {
        state.isError = null
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isError = action.payload as string
      })
      // -------------------- removeFromFavorites --------------------
      .addCase(removeFromFavorites.pending, (state) => {
        state.isError = null
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.isError = action.payload as string
      })
      // -------------------- fetchCategories --------------------
      .addCase(fetchCategories.pending, (state) => {
        state.isError = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isError = action.payload as string
      })
      // -------------------- fetchSexOptions --------------------
      .addCase(fetchSexOptions.pending, (state) => {
        state.isError = null
      })
      .addCase(fetchSexOptions.fulfilled, (state, action) => {
        state.sexOptions = action.payload
      })
      .addCase(fetchSexOptions.rejected, (state, action) => {
        state.isError = action.payload as string
      })
      // -------------------- fetchSpeciesOptions --------------------
      .addCase(fetchSpeciesOptions.pending, (state) => {
        state.isError = null
      })
      .addCase(fetchSpeciesOptions.fulfilled, (state, action) => {
        state.speciesOptions = action.payload
      })
      .addCase(fetchSpeciesOptions.rejected, (state, action) => {
        state.isError = action.payload as string
      })
  },
})

export const { setPage, setFilters, setSorting, resetFilters } = noticesSlice.actions

export const noticesReducer = noticesSlice.reducer
