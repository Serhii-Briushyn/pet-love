// -------------------- State types --------------------

export interface NewsState {
  news: News[]
  keyword: string
  totalPages: number
  currentPage: number
  isError: string | null
}

// -------------------- API types --------------------

export interface News {
  _id: string
  imgUrl: string
  title: string
  text: string
  date: string
  url: string
}

export interface NewsResponse {
  page: number
  perPage: number
  totalPages: number
  results: News[]
}
