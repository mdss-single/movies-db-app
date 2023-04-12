import { MediaType } from '../enums/media-types';

export interface CastAndCrewDTO {
  id?:               number;
  episode_count?:    number;
  overview:          string;
  genre_ids:         number[];
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
  video?:            boolean;
  release_date?:     Date;
  adult?:            boolean;
  job?:              string;
}

export interface MovieCastDTO extends CastAndCrewDTO {
  original_title?: string;
  title?:          string;
}

export interface TvCastDTO extends CastAndCrewDTO {
  original_name?: string;
  name?:          string;
}

export interface MovieCrewDTO extends CastAndCrewDTO {
  original_title?: string;
  title?:          string;
}

export interface TvCrewDTO extends CastAndCrewDTO {
  original_name?: string;
  name?:          string;
}

export interface CastCard {
  id:      number;
  name:    string;
  poster:  string;
  type:    MediaType;
  role:    string;
  date:    Date;
}

export interface CastAndCrewResultDTO {
  cast: (MovieCastDTO | TvCastDTO)[];
  crew: (MovieCrewDTO | TvCrewDTO)[];
}

export interface CastAndCrew {
  cast: CastCard[];
  crew: CastCard[];
}
