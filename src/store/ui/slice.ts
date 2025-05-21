import { createSlice } from "@reduxjs/toolkit"

interface UIState {
  isLoading: boolean
  currentModal: null | "menu" | "approved" | "attention" | "notice"
  modalProps: Record<string, unknown>
}

const initialState: UIState = {
  isLoading: false,
  currentModal: null,
  modalProps: {},
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
      state.modalProps = action.payload.props || {}
    },
    closeModal: (state) => {
      state.currentModal = null
      state.modalProps = {}
    },
  },
})

export const { setLoading, openModal, closeModal } = uiSlice.actions
export const uiReducer = uiSlice.reducer
