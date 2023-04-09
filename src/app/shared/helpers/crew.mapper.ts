import { MediaType } from '../enums/media-types';
import {
  CastCard,
  CastDTO
} from '../interfaces/cast';

export function castCrewMapper(obj: CastDTO): CastCard {
  return {
    id: obj.id ?? 0,
    name: obj.title || '',
    date: obj.first_air_date || new Date(),
    type: obj.media_type ?? MediaType.Movie,
    poster: obj.backdrop_path || '',
    role: obj.job || '',
  }
}
