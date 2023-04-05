import {
  CastCard,
  CastDTO
} from '../interfaces/cast';

export function castMapper(obj: CastDTO): CastCard {
  return {
    id: obj.id ?? 0,
    name: obj.name ?? '',
    poster: obj.profile_path ?? '',
    role: obj.character || obj.job || '',
  }
}
