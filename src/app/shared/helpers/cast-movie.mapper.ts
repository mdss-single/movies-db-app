import { MediaType } from '../enums/media-types';
import {
  CastCard,
  MovieCastDTO
} from '../interfaces/cast';

export function castMovieMapper(obj: MovieCastDTO): CastCard {
  return {
    id: obj.id ?? 0,
    name: obj.original_title ?? '',
    date: obj.release_date ?? new Date(),
    type: MediaType.Movie,
    poster: obj.profile_path ?? '',
    role: obj.character ?? '',
  }
}
