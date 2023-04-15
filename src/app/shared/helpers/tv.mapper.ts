import { MediaType } from '../enums/media-types';
import {
  MovieShortCard,
  TvDTO
} from '../interfaces/movies';

export function tvMapper(obj: TvDTO): MovieShortCard {
  return {
    id: obj.id ?? 0,
    title: obj.name ?? '',
    poster: obj.poster_path ?? '',
    type: MediaType.Tv,
    rating: obj.vote_average ?? 0,
    date: obj.first_air_date ? new Date(obj.first_air_date) : new Date(),
  }
}
