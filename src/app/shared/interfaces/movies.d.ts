export interface MediaDTO {
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
  overview?:              string;
  popularity?:            number;
  poster_path?:           null;
  production_companies?:  ProductionCompany[];
  production_countries?:  ProductionCountry[];
  origin_country?:        string[];
  revenue?:               number;
  runtime?:               number;
  spoken_languages?:      SpokenLanguage[];
  status?:                string;
  tagline?:               string;
  video?:                 boolean;
  vote_average?:          number;
  vote_count?:            number;
}

export interface MovieDTO extends MediaDTO {
  title?:          string;
  original_title?: string;
  release_date?:   Date;
}

export interface TvDTO extends MediaDTO {
  name?:           string;
  original_name?:  string;
  first_air_date?: Date;
}

export interface MovieShortCard {
  id: number;
  type: string;
  title: string;
  poster: string;
  rating: number;
  date: Date;
}

export interface MovieDetails {
  id: number;
  title: string;
  description: string;
  bg: string;
  picture: string;
  date: Date;
  genres: Genre[];
  rating: number;
}

export interface MovieDetailsOptions {
  top_ten?: boolean;
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

export interface MovieRating {
  status_code: number,
  status_message: string;
}

export interface MovieRatingValue {
  value: number;
}
