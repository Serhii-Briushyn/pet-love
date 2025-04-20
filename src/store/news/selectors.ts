import { RootState } from "store/store";

export const selectNews = (state: RootState) => state.news.items;
export const selectPage = (state: RootState) => state.news.page;
export const selectTotalPages = (state: RootState) => state.news.totalPages;
export const selectIsError = (state: RootState) => state.news.isError;
