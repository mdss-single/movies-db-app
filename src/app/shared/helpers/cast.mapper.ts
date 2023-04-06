import {
  CastCard,
  CastDTO
} from '../interfaces/cast';

export function castMapper(obj: CastDTO): CastCard {
  return {
    id: obj.id ?? 0,
    name: obj.original_title || obj.name || '',
    date: obj.release_date || obj.first_air_date || new Date(),
    type: obj.media_type ?? 'movie',
    poster: obj.profile_path || obj.backdrop_path || '',
    role: obj.character || obj.job || '',
  }
}
