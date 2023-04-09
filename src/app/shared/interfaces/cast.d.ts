import { MediaType } from '../enums/media-types';

export interface CastDTO {
  id?:               number;
  episode_count?:    number;
  overview:          string;
  original_name?:    string;
  genre_ids:         number[];
  name?:             string;
  media_type?:       MediaType;
  poster_path?:      null | string;
  first_air_date?:   Date;
  vote_average?:     number;
  vote_count?:       number;
  character?:        string;
  backdrop_path?:    string;
  profile_path?:     string;
  popularity?:       number;
  credit_id?:        string;
  original_title?:   string;
  video?:            boolean;
  release_date?:     Date;
  title?:            string;
  adult?:            boolean;
  job?:              string;
}

export interface CastCard {
  id:     number;
  name:   string;
  poster: string;
  date:   Date;
  type:   MediaType;
  role:   string;
}

export interface CastAndCrewDTO {
  cast: CastDTO[];
  crew: CastDTO[];
}

export interface CastAndCrew {
  cast: CastCard[];
  crew: CastCard[];
}
