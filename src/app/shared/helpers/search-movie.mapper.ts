import { MediaType } from '../enums/media-types';
import {
  SearchCard,
  SearchCardDTO
} from '../interfaces/search';

export function searchMovieMapper(obj: SearchCardDTO): SearchCard {
  return {
    id: obj.id ?? 0,
    title: obj.title ?? '',
    poster: obj.poster_path ?? '',
    type: MediaType.Movie,
    rating: obj.vote_average ?? 0,
    date: obj.release_date ? new Date(obj.release_date) : new Date(),
  }
}
