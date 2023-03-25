import {
  SearchMediaType,
  SearchOriginalLanguage
} from '../enums/search';
import { MovieDTO } from './movies';

export interface SearchCardDTO {
  poster_path?:       null | string;
  popularity?:        number;
  id?:                number;
  overview?:          string;
  backdrop_path?:     null | string;
  vote_average?:      number;
  media_type?:        SearchMediaType;
  first_air_date?:    string;
  origin_country?:    string[];
  genre_ids?:         number[];
  original_language?: SearchOriginalLanguage;
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
