import { MediaType } from '../enums/media-types';
import {
  CastCard,
  TvCrewDTO
} from '../interfaces/cast';

export function crewTvMapper(obj: TvCrewDTO): CastCard {
  return {
    id: obj.id ?? 0,
    name: obj.name ?? '',
    poster: obj.poster_path ?? '',
    role: obj.job ?? '',
    date: new Date(),
    type: MediaType.Tv,
  }
}
