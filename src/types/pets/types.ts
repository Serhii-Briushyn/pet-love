import { Notice } from "types/notices/types";

export type Pet = {
  _id: string;
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
};

export type AddPetRequest = {
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: "male" | "female" | "unknown" | "multiple";
};

export type DeletePetResponse = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  token: string;
  pets: Notice[];
};
