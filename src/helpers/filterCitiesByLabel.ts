import { CityOption } from "@store/cities/types";

export const filterCitiesByLabel = (cities: CityOption[], query: string) => {
  const normalized = query.trim().toLowerCase();
  return normalized
    ? cities.filter((city) => city.label.toLowerCase().includes(normalized))
    : [];
};
