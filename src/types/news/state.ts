import { NewsItem } from "./types";

export interface NewsState {
  items: NewsItem[];
  totalPages: number;
  page: number;
  isError: string | null;
}
