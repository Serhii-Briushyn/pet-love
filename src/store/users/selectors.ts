import { RootState } from "@store/store"

export const selectUser = (state: RootState) => state.users.user
export const selectFavorites = (state: RootState) => state.users.favorites
export const selectViewed = (state: RootState) => state.users.viewed
export const selectPets = (state: RootState) => state.users.pets
export const selectSelectedPetId = (state: RootState) => state.users.selectedPetId
export const selectToken = (state: RootState) => state.users.token
export const selectFavoritesIds = (state: RootState) => state.users.favoritesIds
export const selectIsLoggedIn = (state: RootState) => state.users.isLoggedIn
export const selectIsError = (state: RootState) => state.users.isError
