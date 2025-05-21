import { RootState } from '@store/store'

export const selectNotices = (state: RootState) => state.notices.notices
export const selectSelectedNotice = (state: RootState) => state.notices.selectedNotice

export const selectError = (state: RootState) => state.notices.isError

export const selectCurrentPage = (state: RootState) => state.notices.currentPage
export const selectTotalPages = (state: RootState) => state.notices.totalPages

export const selectFilters = (state: RootState) => state.notices.filters
export const selectSorting = (state: RootState) => state.notices.sorting

export const selectCategories = (state: RootState) => state.notices.categories
export const selectSexOptions = (state: RootState) => state.notices.sexOptions
export const selectSpeciesOptions = (state: RootState) => state.notices.speciesOptions
