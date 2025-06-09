import { RootState } from "@store/store"

export const selectIsLoading = (state: RootState): boolean => state.ui.isLoading
export const selectCurrentModal = (state: RootState) => state.ui.currentModal
