import { createSlice } from "@reduxjs/toolkit"

interface UIState {
  isLoading: boolean
  currentModal: null | "menu" | "approved" | "attention" | "notice" | "edit" | "confirm"
}

const initialState: UIState = {
  isLoading: false,
  currentModal: null,
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    openModal: (state, action) => {
      state.currentModal = action.payload.name
    },
    closeModal: (state) => {
      state.currentModal = null
    },
  },
})

export const { setLoading, openModal, closeModal } = uiSlice.actions
export const uiReducer = uiSlice.reducer
