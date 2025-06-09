import { RootState } from "@store/store"

export const selectCities = (state: RootState) => state.cities.cities

export const selectIsError = (state: RootState) => state.cities.isError
