import { SearchMediaType } from '../enums/search';
import {
  MovieDTO,
  MovieShortCard
} from '../interfaces/movies';
import { SearchCardDTO } from '../interfaces/search';

export function movieMapper(obj: SearchCardDTO | MovieDTO): MovieShortCard {
  return {
    id: obj.id ?? 0,
    title: obj.title ?? '',
    poster: obj.poster_path ?? '',
    type: SearchMediaType.Movie,
    rating: obj.vote_average ?? 0,
    date: obj.release_date ?? new Date(),
  }
}
