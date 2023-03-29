import { SearchMediaType } from '../enums/search';
import {
  MovieDTO,
  MovieShortCard
} from '../interfaces/movies';

export function movieMapper(obj: MovieDTO): MovieShortCard {
  return {
    id: obj.id ?? 0,
    title: obj.title ?? '',
    poster: obj.poster_path ?? '',
    type: SearchMediaType.Movie,
    rating: obj.vote_average ?? 0,
    date: obj.release_date ?? new Date(),
  }
}
