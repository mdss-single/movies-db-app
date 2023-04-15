import {
  MovieDetails,
  MovieDTO
} from '../interfaces/movies';

export function movieDetailsMapper(obj: MovieDTO): MovieDetails {
  return {
    id: obj.id ?? 0,
    title: obj.title ?? '',
    description: obj.overview ?? '',
    picture: obj.backdrop_path ?? '',
    date: obj.release_date ? new Date(obj.release_date) : new Date(),
    genres: obj.genres ?? [],
    rating: obj.vote_average ?? 0,
  }
}
