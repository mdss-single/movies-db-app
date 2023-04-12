import { MediaType } from '../enums/media-types';
import {
  CastCard,
  MovieCrewDTO
} from '../interfaces/cast';

export function crewMovieMapper(obj: MovieCrewDTO): CastCard {
  return {
    id: obj.id ?? 0,
    name: obj.title ?? '',
    poster: obj.poster_path ?? '',
    role: obj.job ?? '',
    date: new Date(),
    type: MediaType.Movie,
  }
}
