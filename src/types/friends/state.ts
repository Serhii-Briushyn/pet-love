import { FriendsResponse } from "./types";

export interface FriendsState {
  items: FriendsResponse[];
  isError: string | null;
}
