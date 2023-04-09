import { MediaType } from '../enums/media-types';
import {
  SearchCard,
  SearchCardDTO
} from '../interfaces/search';

export function searchTvMapper(obj: SearchCardDTO): SearchCard {
  return {
    id: obj.id ?? 0,
    title: obj.name ?? '',
    poster: obj.poster_path ?? '',
    type: MediaType.Tv,
    rating: obj.vote_average ?? 0,
    date: obj.first_air_date ?? new Date(),
  }
}
