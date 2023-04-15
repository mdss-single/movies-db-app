import {
  MovieCastDTO,
  TvCastDTO
} from '../interfaces/cast';

export function isMovieCastGuard(obj: MovieCastDTO | TvCastDTO): obj is MovieCastDTO {
  return (obj as MovieCastDTO).title !== undefined;
}
