import { RootState } from "@store/store"

export const selectNews = (state: RootState) => state.news.news
export const selectKeyword = (state: RootState) => state.news.keyword
export const selectCurrentPage = (state: RootState) => state.news.currentPage
export const selectTotalPages = (state: RootState) => state.news.totalPages
export const selectIsError = (state: RootState) => state.news.isError
