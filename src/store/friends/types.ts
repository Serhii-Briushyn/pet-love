// -------------------- State types --------------------

export interface FriendsState {
  friends: FriendsResponse[]
  isError: string | null
}

// -------------------- API types --------------------

export interface WorkDays {
  _id: string
  isOpen: boolean
  from?: string
  to?: string
}

export interface FriendsResponse {
  _id: string
  title: string
  url: string
  addressUrl: string | null
  imageUrl: string
  address: string | null
  workDays: WorkDays[] | null
  phone: string | null
  email: string | null
}
