import { SearchMediaType } from '../enums/search';
import {
  MovieDTO,
  MovieShortCard
} from '../interfaces/movies';
import {
  SearchCardDTO
} from '../interfaces/search';

export function tvMapper(obj: SearchCardDTO | MovieDTO): MovieShortCard {
  return {
    id: obj.id ?? 0,
    title: obj.name ?? '',
    poster: obj.poster_path ?? '',
    type: SearchMediaType.Tv,
    rating: obj.vote_average ?? 0,
    date: obj.first_air_date ?? new Date(),
  }
}
