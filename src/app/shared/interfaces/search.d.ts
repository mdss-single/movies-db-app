import { MediaType } from '../enums/media-types';
import { MovieDTO } from './movies';

export interface SearchCardDTO {
  poster_path?:       null | string;
  popularity?:        number;
  id?:                number;
  overview?:          string;
  backdrop_path?:     null | string;
  vote_average?:      number;
  media_type?:        MediaType;
  first_air_date?:    Date;
  origin_country?:    string[];
  genre_ids?:         number[];
  vote_count?:        number;
  name?:              string;
  original_name?:     string;
  adult?:             boolean;
  release_date?:      Date;
  original_title?:    string;
  title?:             string;
  video?:             boolean;
  profile_path?:      null | string;
  known_for?:         MovieDTO[];
}

export interface SearchCard {
  id: number;
  title: string;
  poster: string;
  type: MediaType;
  rating?: number;
  date?: Date;
}

export interface SearchPersonDTO {
  id?:           number;
  name:          string;
  known_for:     SearchCardDTO[];
  profile_path?: string | null;
  adult?:        boolean;
  popularity:    number;
}
