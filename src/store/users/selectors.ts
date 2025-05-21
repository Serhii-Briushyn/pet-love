import { RootState } from '@store/store'

export const selectUser = (state: RootState) => state.users.user
export const selectToken = (state: RootState) => state.users.token
export const selectFavoritesIds = (state: RootState) => state.users.favoritesIds
export const selectIsLoggedIn = (state: RootState) => state.users.isLoggedIn
export const selectIsError = (state: RootState) => state.users.isError
