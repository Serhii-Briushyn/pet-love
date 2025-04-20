import { RootState } from "store/store";

export const selectFriends = (state: RootState) => state.friends.items;
export const selectFriendsError = (state: RootState) => state.friends.isError;
