import {
  MovieDTO,
  MovieRatingCard
} from '../interfaces/movies';

export function ratingMovieTvMapper(obj: MovieDTO): MovieRatingCard {
  return {
    id: obj.id ?? 0,
    rating: obj.rating ?? 0,
  }
}
