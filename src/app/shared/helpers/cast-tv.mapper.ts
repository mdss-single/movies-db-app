import { MediaType } from '../enums/media-types';
import {
  CastCard,
  TvCastDTO
} from '../interfaces/cast';

export function castTvMapper(obj: TvCastDTO): CastCard {
  return {
    id: obj.id ?? 0,
    name: obj.name ?? '',
    date: obj.first_air_date ? new Date(obj.first_air_date) : new Date(),
    type: MediaType.Tv,
    poster: obj.profile_path ?? '',
    role: obj.character ?? '',
  }
}
