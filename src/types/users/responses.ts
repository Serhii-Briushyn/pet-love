import { Notice } from "types/notices/types";
import { Pet } from "types/pets/types";

export type CurrentResponse = {
  _id: string;
  name: string;
  email: string;
  token: string;
  noticesFavorites: Notice[];
};

export type CurrentFullResponse = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  token: string;
  noticesViewed: Notice[];
  noticesFavorites: Notice[];
  pets: Pet[];
  createdAt: string;
  updatedAt: string;
};
