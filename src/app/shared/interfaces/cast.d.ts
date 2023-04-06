export interface CastDTO {
  id?:               number;
  episode_count?:    number;
  overview:          string;
  original_name?:    string;
  genre_ids:         number[];
  name?:             string;
  media_type?:       'movie' | 'tv';
  poster_path?:      null | string;
  first_air_date?:   string;
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
  date:   Date | string;
  type:   'movie' | 'tv';
  poster: string;
  role:   string;
}
