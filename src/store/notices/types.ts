// -------------------- State types --------------------

export type NoticesState = {
  notices: Notice[]
  selectedNotice: NoticeByIdResponse | null
  totalPages: number
  currentPage: number
  isError: string | null
  filters: Filters
  sorting: Sorting
  categories: string[]
  sexOptions: string[]
  speciesOptions: string[]
}

export type Filters = {
  keyword: string
  category: string
  sex: string
  species: string
  location: string
}

export type Sorting = "byPopularityAsc" | "byPopularityDesc" | "byPriceAsc" | "byPriceDesc" | null

// -------------------- API types --------------------

export type NoticeBase = {
  _id: string
  species: string
  category: string
  price?: number
  title: string
  name: string
  birthday: string
  comment: string
  sex: string
  imgURL: string
  popularity: number
  createdAt: string
  updatedAt?: string
}

export type Notice = NoticeBase & {
  location: string
  user: string
}

export type NoticeResponse = {
  page: number
  perPage: number
  totalPages: number
  results: Notice[]
}

export type NoticeLocation = {
  _id: string
  stateEn: string
  cityEn: string
}

export type NoticeUser = {
  _id: string
  email: string
  phone: string
}

export type NoticeByIdResponse = NoticeBase & {
  location: NoticeLocation
  user: NoticeUser
}
