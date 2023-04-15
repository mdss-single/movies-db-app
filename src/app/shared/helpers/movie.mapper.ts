import { MediaType } from '../enums/media-types';
import {
  MovieDTO,
  MovieShortCard
} from '../interfaces/movies';

export function movieMapper(obj: MovieDTO): MovieShortCard {
  return {
    id: obj.id ?? 0,
    title: obj.title ?? '',
    poster: obj.poster_path ?? '',
    type: MediaType.Movie,
    rating: obj.vote_average ?? 0,
    date: obj.release_date ? new Date(obj.release_date) : new Date(),
  }
}
