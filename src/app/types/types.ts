export type RequestParametersT = {
  search?: boolean;
  searchQ?: string;
  uri?: string;
}

export type DisplayDetailT = {
  property: string;
  detail?: FilmT[] | ResidentT[] | undefined;
  position?: number | string;
}

export type AllwedPropertiesForDrillT = 'films' | 'residents';

export type PlanetT = {
  name: string;
  climate?: string;
  created?: Date;
  diameter?: string;
  edited?: string;
  films?: string[];
  residents?: string[];
  gravity?: string;
  orbital_period?: string;
  population?: string;
  rotation_period?: string;
  surface_water?: string;
  terrain?: string;
  url?: string;
};

export type FilmT = {
  title: string;
  episode_id?: string;
  opening_crawl?: string;
  director?: string;
  producer?: string;
  release_date?: Date;
  species?: string[];
  starships?: string[]
  vehicles?: string[];
  characters?: string[];
  planets?: string[];
  url?: string;
  created?: string;
  edited?:string;
}

export type ResidentT = {
  name: string;
  birth_year?: string;
  eye_color?: string;
  gender?: string;
  hair_color?: string;
  height?: string;
  mass?: string;
  skin_color?: string;
  homeworld?: string;
  films?: FilmT[];
  species?: any[];
  starships?: any[];
  vehicles?: any[];
  url?: string;
  created?: string;
  edited?: string;
}

export const allowedPropertiesForDetails = [
  'title',
  'episode_id',
  'opening_crawl',
  'director',
  'producer',
  'release_date',
  'name',
  'birth_year',
  'eye_color',
  'gender',
  'hair_color',
  'height',
  'mass',
  'skin_color',
  'homeworld',
  'url',
  'created',
  'edited',
];