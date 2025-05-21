// -------------------- State types --------------------

export type CitiesState = {
  cities: CityOption[];
  isError: string | null;
};

// -------------------- API types --------------------

export type CityResponse = {
  _id: string;
  useCounty: string;
  stateEn: string;
  cityEn: string;
  countyEn: string;
};

export type CityOption = {
  label: string;
  value: string;
};
