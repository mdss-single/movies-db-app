export interface MoviesDTO {
  page: number;
  results: MovieDTO[];
  total_results: number,
  total_pages: number
}

export interface MovieDTO {
  adult?:                 boolean;
  backdrop_path?:         string;
  belongs_to_collection?: null;
  budget?:                number;
  genres?:                Genre[];
  genre_ids?:             number[];
  homepage?:              string;
  id?:                    number;
  imdb_id?:               string;
  original_language?:     string;
  original_title?:        string;
  overview?:              string;
  popularity?:            number;
  poster_path?:           null;
  production_companies?:  ProductionCompany[];
  production_countries?:  ProductionCountry[];
  origin_country?:        string[];
  release_date?:          Date;
  first_air_date?:        Date;
  revenue?:               number;
  runtime?:               number;
  spoken_languages?:      SpokenLanguage[];
  status?:                string;
  tagline?:               string;
  title?:                 string;
  name?:                  string;
  original_name?:         string;
  video?:                 boolean;
  vote_average?:          number;
  vote_count?:            number;
}

export interface MovieShortCard {
  id: string;
  type: string;
  title: string;
  poster: string;
  vote: number;
  date: Date;
}

export interface Genre {
  id:   number;
  name: string;
}

export interface ProductionCompany {
  id:             number;
  logo_path:      null | string;
  name:           string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name:       string;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name:      string;
}
