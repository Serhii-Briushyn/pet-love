import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  AddPetRequest,
  AuthResponse,
  CurrentFullResponse,
  CurrentResponse,
  EditRequest,
  SignInRequest,
  SignUpRequest,
} from './types'

export const goItApi = axios.create({
  baseURL: 'https://petlove.b.goit.study/api/',
})

export const setAuthHeader = (token: string): void => {
  goItApi.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const clearAuthHeader = () => {
  goItApi.defaults.headers.common.Authorization = ''
}

// -------------------- register --------------------

export const register = createAsyncThunk<AuthResponse, SignUpRequest, { rejectValue: string }>(
  'users/signup',
  async (credentials, thunkAPI) => {
    try {
      const res = await goItApi.post<AuthResponse>('/users/signup', credentials)
      setAuthHeader(res.data.token)
      return res.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status

        if (statusCode === 400) {
          return thunkAPI.rejectWithValue(
            'Invalid input. Please check your name, email and password.',
          )
        } else if (statusCode === 404) {
          return thunkAPI.rejectWithValue('Service not found.')
        } else if (statusCode === 409) {
          return thunkAPI.rejectWithValue('User with this email is already registered.')
        } else if (statusCode === 500) {
          return thunkAPI.rejectWithValue('Oops! Something went wrong. Please try again.')
        }
      }

      return thunkAPI.rejectWithValue('Registration failed. Please try again.')
    }
  },
)

// -------------------- login --------------------

export const login = createAsyncThunk<AuthResponse, SignInRequest, { rejectValue: string }>(
  'users/signin',
  async (credentials, thunkAPI) => {
    try {
      const res = await goItApi.post<AuthResponse>('/users/signin', credentials)
      setAuthHeader(res.data.token)
      return res.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status

        if (statusCode === 400) {
          return thunkAPI.rejectWithValue(
            'Invalid input. Please check your name, email and password.',
          )
        } else if (statusCode === 401) {
          return thunkAPI.rejectWithValue('Email or password is incorrect.')
        } else if (statusCode === 404) {
          return thunkAPI.rejectWithValue('Service not found.')
        } else if (statusCode === 500) {
          return thunkAPI.rejectWithValue('Oops! Something went wrong. Please try again.')
        }
      }

      return thunkAPI.rejectWithValue('Login failed. Please try again.')
    }
  },
)

// -------------------- logout --------------------

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'users/signout',
  async (_, thunkAPI) => {
    try {
      await goItApi.post('/users/signout')
      clearAuthHeader()
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status

        if (statusCode === 401) {
          return thunkAPI.rejectWithValue('Unauthorized. Please log in again.')
        } else if (statusCode === 404) {
          return thunkAPI.rejectWithValue('Service not found.')
        } else if (statusCode === 500) {
          return thunkAPI.rejectWithValue('Oops! Something went wrong. Please try again.')
        }
      }

      return thunkAPI.rejectWithValue('Logout failed. Please try again.')
    }
  },
)

// -------------------- getCurrentUser --------------------

export const getCurrentUser = createAsyncThunk<CurrentResponse, void, { rejectValue: string }>(
  'users/currentUser',
  async (_, thunkAPI) => {
    try {
      const res = await goItApi.get<CurrentResponse>('/users/current')
      return res.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status

        if (statusCode === 401) {
          return thunkAPI.rejectWithValue('Unauthorized. Please log in again.')
        } else if (statusCode === 404) {
          return thunkAPI.rejectWithValue('Service not found.')
        } else if (statusCode === 500) {
          return thunkAPI.rejectWithValue('Oops! Something went wrong. Please try again.')
        }
      }

      return thunkAPI.rejectWithValue('Failed to fetch user data.')
    }
  },
)

// -------------------- getCurrentUserFull --------------------

export const getCurrentUserFull = createAsyncThunk<
  CurrentFullResponse,
  void,
  { rejectValue: string }
>('users/currentUserFull', async (_, thunkAPI) => {
  try {
    const res = await goItApi.get<CurrentFullResponse>('/users/current/full')
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status

      if (statusCode === 401) {
        return thunkAPI.rejectWithValue('Unauthorized. Please log in again.')
      } else if (statusCode === 404) {
        return thunkAPI.rejectWithValue('Service not found.')
      } else if (statusCode === 500) {
        return thunkAPI.rejectWithValue('Oops! Something went wrong. Please try again.')
      }
    }

    return thunkAPI.rejectWithValue('Failed to fetch full user data.')
  }
})

// -------------------- updateUserProfile --------------------

export const updateUserProfile = createAsyncThunk<
  CurrentFullResponse,
  EditRequest,
  { rejectValue: string }
>('users/editProfile', async (userData, thunkAPI) => {
  try {
    const res = await goItApi.patch<CurrentFullResponse>('/users/current/edit', userData)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status

      if (statusCode === 400) {
        return thunkAPI.rejectWithValue('Invalid input. Please check all fields.')
      } else if (statusCode === 404) {
        return thunkAPI.rejectWithValue('Service not found.')
      } else if (statusCode === 409) {
        return thunkAPI.rejectWithValue('User with this email is already registered.')
      } else if (statusCode === 500) {
        return thunkAPI.rejectWithValue('Oops! Something went wrong. Please try again.')
      }
    }

    return thunkAPI.rejectWithValue('Failed to update profile.')
  }
})

// -------------------- addPet --------------------

export const addPet = createAsyncThunk<CurrentFullResponse, AddPetRequest, { rejectValue: string }>(
  'users/addPet',
  async (petData, thunkAPI) => {
    try {
      const res = await goItApi.post<CurrentFullResponse>('/users/current/pets/add', petData)
      return res.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status

        if (statusCode === 400) {
          return thunkAPI.rejectWithValue('Invalid input. Please check all fields.')
        } else if (statusCode === 404) {
          return thunkAPI.rejectWithValue('Service not found.')
        } else if (statusCode === 500) {
          return thunkAPI.rejectWithValue('Oops! Something went wrong. Please try again.')
        }
      }

      return thunkAPI.rejectWithValue('Failed to add pet. Please try again.')
    }
  },
)

// -------------------- deletePet --------------------

export const deletePet = createAsyncThunk<CurrentFullResponse, string, { rejectValue: string }>(
  'users/deletePet',
  async (petId, thunkAPI) => {
    try {
      const res = await goItApi.delete<CurrentFullResponse>(`/users/current/pets/remove/${petId}`)
      return res.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const statusCode = error.response.status

        if (statusCode === 400) {
          return thunkAPI.rejectWithValue('Invalid pet ID.')
        } else if (statusCode === 404) {
          return thunkAPI.rejectWithValue('Pet not found.')
        } else if (statusCode === 409) {
          return thunkAPI.rejectWithValue('You are not the owner of this pet.')
        } else if (statusCode === 500) {
          return thunkAPI.rejectWithValue('Oops! Something went wrong. Please try again.')
        }
      }

      return thunkAPI.rejectWithValue('Failed to delete pet.')
    }
  },
)
