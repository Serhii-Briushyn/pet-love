import { Notice } from '@store/notices/types'

// -------------------- State types --------------------

export interface UsersState {
  user: CurrentFullResponse | null
  token: string | null
  favoritesIds: string[]
  isLoggedIn: boolean
  isError: string | null
}

// -------------------- API types --------------------

export type SignUpRequest = {
  email: string
  name: string
  password: string
}

export type SignInRequest = {
  email: string
  password: string
}

export type AuthResponse = {
  email: string
  name: string
  token: string
}

export type EditRequest = {
  name?: string
  email?: string
  phone?: string
  avatar?: string
}

export type CurrentResponse = {
  _id: string
  name: string
  email: string
  token: string
  noticesFavorites: Notice[]
}

export type CurrentFullResponse = {
  _id: string
  name: string
  email: string
  avatar: string
  phone: string
  token: string
  noticesViewed: Notice[]
  noticesFavorites: Notice[]
  pets: Pet[]
  createdAt: string
  updatedAt: string
}

export type Pet = {
  _id: string
  name: string
  title: string
  imgURL: string
  species: string
  birthday: string
  sex: string
  createdAt: string
  updatedAt: string
}

export type AddPetRequest = {
  name: string
  title: string
  imgURL: string
  species: string
  birthday: string
  sex: string
}

export type DeletePetResponse = {
  _id: string
  name: string
  email: string
  avatar: string
  phone: string
  token: string
  pets: Notice[]
}
