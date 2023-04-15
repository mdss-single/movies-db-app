import {
  MovieDetails,
  TvDTO
} from '../interfaces/movies';

export function tvDetailsMapper(obj: TvDTO): MovieDetails {
  return {
    id: obj.id ?? 0,
    title: obj.name ?? '',
    description: obj.overview ?? '',
    picture: obj.backdrop_path ?? '',
    date: obj.first_air_date ? new Date(obj.first_air_date) : new Date(),
    genres: obj.genres ?? [],
    rating: obj.vote_average ?? 0,
  }
}
