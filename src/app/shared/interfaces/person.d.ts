import {
  MovieDTO,
  TvDTO
} from './movies';

export interface PersonDTO {
  birthday?:             Date;
  known_for_department?: string;
  deathday?:             null;
  id?:                   number;
  name?:                 string;
  also_known_as?:        string[];
  gender?:               number;
  biography?:            string;
  popularity?:           number;
  place_of_birth?:       string;
  profile_path?:         string;
  adult?:                boolean;
  imdb_id?:              string;
  homepage?:             null;
}

export interface PersonListDTO {
  page:          number;
  results:       PersonInfoResult[];
  total_results: number;
  total_pages:   number;
}

export interface PersonInfoResult {
  profile_path: string;
  adult?:        boolean;
  id:           number;
  known_for?:    MovieDTO[] | TvDTO[];
  name:         string;
  popularity?:   number;
}

export interface PersonDetails {
  id:             number;
  name:           string;
  biography:      string;
  birthday:       Date;
  gender:         string;
  place_of_birth: string;
  photo:          string;
}
