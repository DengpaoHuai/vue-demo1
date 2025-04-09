export type Planet = {
  name: string;
  population: string;
  orbital_period: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
  id: number;
  rotation_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
};

export type PlanetResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
};
