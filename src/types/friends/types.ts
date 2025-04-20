export interface FriendsItem {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
}

export interface FriendsResponse {
  _id: string;
  title: string;
  url: string;
  addressUrl: string | null;
  imageUrl: string;
  address: string | null;
  workDays: FriendsItem[] | null;
  phone: string | null;
  email: string | null;
}
