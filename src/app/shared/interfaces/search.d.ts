import { Movie } from './movies';
import { Person } from './person';

export interface Search {
  "movie_results": Movie[],
  "person_results": Person[],
  "tv_results": Movie[],
}
