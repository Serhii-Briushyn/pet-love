import { RootState } from "store/store";

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsError = (state: RootState) => state.auth.isError;
