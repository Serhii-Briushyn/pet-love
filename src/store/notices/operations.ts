import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Filters, NoticeByIdResponse, NoticeResponse, Sorting } from './types'
import { RootState } from '@store/store'
import { goItApi } from '@store/users/operations'

const handleAxiosError = (error: unknown, fallback = 'Unknown error') => {
  if (axios.isAxiosError(error) && error.response) {
    const status = error.response.status
    switch (status) {
      case 400:
        return 'This id is not valid'
      case 404:
        return 'Resource not found'
      case 409:
        return "This notice is not found or already added to user's favorite notices"
      case 500:
        return 'Oops! Something went wrong. Please try again.'
    }
  }
  return fallback
}

// -------------------- fetchNotices --------------------

export const fetchNotices = createAsyncThunk<
  NoticeResponse,
  { page?: number; limit?: number; filters: Filters; sorting?: Sorting },
  { state: RootState; rejectValue: string }
>('notices/fetchAll', async ({ page = 1, limit = 6, filters, sorting = {} }, thunkAPI) => {
  try {
    const params = new URLSearchParams()

    if (filters.keyword) params.append('keyword', filters.keyword)
    if (filters.category) params.append('category', filters.category)
    if (filters.sex) params.append('sex', filters.sex)
    if (filters.species) params.append('species', filters.species)
    if (filters.location) params.append('locationId', filters.location)
    if (sorting === 'byPopularityAsc') params.append('byPopularity', 'false')
    if (sorting === 'byPopularityDesc') params.append('byPopularity', 'true')
    if (sorting === 'byPriceAsc') params.append('byPrice', 'true')
    if (sorting === 'byPriceDesc') params.append('byPrice', 'false')

    params.append('page', page.toString())
    params.append('limit', limit.toString())

    const response = await goItApi.get(`/notices?${params.toString()}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(handleAxiosError(error, 'Failed to fetch notices.'))
  }
})

// -------------------- fetchNoticeById --------------------

export const fetchNoticeById = createAsyncThunk<
  NoticeByIdResponse,
  string,
  { rejectValue: string }
>('notices/fetchById', async (id, thunkAPI) => {
  try {
    const response = await goItApi.get(`/notices/${id}`)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(handleAxiosError(error, 'Failed to fetch notice.'))
  }
})

// -------------------- addToFavorites --------------------

export const addToFavorites = createAsyncThunk<string[], string, { rejectValue: string }>(
  'notices/addToFavorites',
  async (id, thunkAPI) => {
    try {
      const response = await goItApi.post(`/notices/favorites/add/${id}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAxiosError(error, 'Failed to add to favorites.'))
    }
  },
)

// -------------------- removeFromFavorites --------------------

export const removeFromFavorites = createAsyncThunk<string[], string, { rejectValue: string }>(
  'notices/removeFromFavorites',
  async (id, thunkAPI) => {
    try {
      const response = await goItApi.delete(`/notices/favorites/remove/${id}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAxiosError(error, 'Failed to remove from favorites.'))
    }
  },
)

// -------------------- fetchCategories --------------------

export const fetchCategories = createAsyncThunk<string[], void, { rejectValue: string }>(
  'notices/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await goItApi.get('/notices/categories')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAxiosError(error, 'Failed to load categories.'))
    }
  },
)

// -------------------- fetchSexOptions --------------------

export const fetchSexOptions = createAsyncThunk<string[], void, { rejectValue: string }>(
  'notices/fetchSex',
  async (_, thunkAPI) => {
    try {
      const response = await goItApi.get('/notices/sex')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAxiosError(error, 'Failed to load sex options.'))
    }
  },
)

// -------------------- fetchSpeciesOptions --------------------

export const fetchSpeciesOptions = createAsyncThunk<string[], void, { rejectValue: string }>(
  'notices/fetchSpecies',
  async (_, thunkAPI) => {
    try {
      const response = await goItApi.get('/notices/species')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAxiosError(error, 'Failed to load species options.'))
    }
  },
)
