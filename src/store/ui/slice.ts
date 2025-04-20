import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isLoading: boolean;
}

const initialState: UIState = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
