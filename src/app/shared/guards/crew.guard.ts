import {
  MovieCrewDTO,
  TvCrewDTO
} from '../interfaces/cast';

export function isMovieCrewGuard(obj: MovieCrewDTO | TvCrewDTO): obj is MovieCrewDTO {
  return (obj as MovieCrewDTO).title !== undefined;
}
