import { CityOption } from "@store/cities/types";

export const findExactCityMatch = (cities: CityOption[], input: string) => {
  const normalized = input.trim().toLowerCase();
  return cities.find((city) => city.label.toLowerCase() === normalized);
};
