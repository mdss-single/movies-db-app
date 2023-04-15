import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  filter,
  map,
  Observable,
} from 'rxjs';
import { MediaType } from '../enums/media-types';
import { isMovieCastGuard } from '../guards/cast.guard';
import { isMovieCrewGuard } from '../guards/crew.guard';
import {
  castMovieMapper,
  castTvMapper,
  crewMovieMapper,
  crewTvMapper,
  movieDetailsMapper,
  tvDetailsMapper,
  movieMapper,
  personMapper,
  searchMovieMapper,
  searchPersonMapper,
  searchTvMapper,
  tvMapper
} from '../helpers';
import {
  CastAndCrew,
  CastAndCrewResultDTO,
  CastCard,
  MovieCastDTO,
  MovieCrewDTO,
  TvCastDTO,
  TvCrewDTO
} from '../interfaces/cast';
import {
  GuestSession,
  ImageConfig
} from '../interfaces/general';
import {
  MovieDetails,
  MovieDetailsOptions,
  MovieDTO,
  MovieRating,
  MovieRatingValue,
  MovieShortCard,
  TvDTO
} from '../interfaces/movies';
import {
  PersonDetails,
  PersonDTO
} from '../interfaces/person';
import {
  SearchCard,
  SearchCardDTO,
  SearchPersonDTO
} from '../interfaces/search';

const searchCardMapperFactory: { [key in MediaType]: (value: SearchCardDTO) => SearchCard } = {
  [MediaType.Movie]: searchMovieMapper,
  [MediaType.Tv]: searchTvMapper,
  [MediaType.Person]: searchPersonMapper,
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {}

  search$(params: string): Observable<SearchCard[]> {
    return this.http.get<{ results: SearchCardDTO[] }>(params).pipe(
      map((data) => {
        return data.results
          .map((result) => {
            if (!result.media_type) {
              return {} as SearchCard;
            }

            return searchCardMapperFactory[result.media_type](result);
          });
      }),
    );
  }

  getMovieList$(params: string): Observable<MovieShortCard[]> {
    return this.http.get<{ results: MovieDTO[] }>(params).pipe(
      map(data => {
        return data.results.map((result) => {
          return movieMapper(result);
        });
      }),
    );
  }

  getTvList$(params: string): Observable<MovieShortCard[]> {
    return this.http.get<{ results: TvDTO[] }>(params).pipe(
      map(data => {
        return data.results.map((result) => {
          return tvMapper(result);
        });
      }),
    );
  }

  getMovieDetails$(params: string): Observable<MovieDetails> {
    return this.http.get<MovieDTO>(params).pipe(
      map(data => {
        return movieDetailsMapper(data);
      }),
    );
  }

  getTvDetails$(params: string): Observable<MovieDetails> {
    return this.http.get<TvDTO>(params).pipe(
      map(data => {
        return tvDetailsMapper(data);
      }),
    );
  }

  getMovieOrTvCast$(params: string, options?: MovieDetailsOptions): Observable<CastAndCrew> {
    return this.http.get<CastAndCrewResultDTO>(params).pipe(
      map((data: CastAndCrewResultDTO) => {
        let castArr = data.cast.map((castItem: MovieCastDTO | TvCastDTO) => {
          const isMovieCast = isMovieCastGuard(castItem);
          return isMovieCast ? castMovieMapper(castItem) : castTvMapper(castItem);
        });

        const crewArr = data.crew.map((castItem: MovieCrewDTO | TvCrewDTO) => {
          const isMovieCrew = isMovieCrewGuard(castItem);
          return isMovieCrew ? crewMovieMapper(castItem) : crewTvMapper(castItem);
        });

        if (options?.top_ten && castArr.length) {
          castArr = castArr.slice(0, 9);
        }

        return {
          cast: castArr,
          crew: crewArr,
        }
      }),
    );
  }

  getPersonDetails$(params: string): Observable<PersonDetails> {
    return this.http.get<PersonDTO>(params).pipe(
      map(data => personMapper(data))
    );
  }

  getPersonKnowsFor$(params: string, id: number): Observable<SearchCard[]> {
    return this.http.get<{ results: SearchPersonDTO[] }>(params).pipe(
      map((data) => {
        return data.results.find((person) => person.id === id);
      }),
      filter(Boolean),
      map((person) => {
        return person.known_for
          .map((card) => card.title ? searchMovieMapper(card) : searchTvMapper(card));
      }),
    );
  }

  getPersonCast$(params: string): Observable<CastAndCrew> {
    return this.http.get<CastAndCrewResultDTO>(params).pipe(
      map((data: CastAndCrewResultDTO) => ({
        cast: data.cast
          .map((castItem: MovieCastDTO | TvCastDTO) => {
            const isMovieCast = isMovieCastGuard(castItem);
            return isMovieCast ? castMovieMapper(castItem) : castTvMapper(castItem);
          })
          .sort((a: CastCard, b: CastCard) => {
            const getDateMs = (date: Date) => new Date(date).getTime();
            return getDateMs(b.date) - getDateMs(a.date);
          }),
        crew: data.crew.map((castItem: MovieCrewDTO | TvCrewDTO) => {
          const isMovieCrew = isMovieCrewGuard(castItem);
          return isMovieCrew ? crewMovieMapper(castItem) : crewTvMapper(castItem);
        }),
      })),
    );
  }

  getImageConfig$(params: string): Observable<ImageConfig> {
    return this.http.get<{ images: ImageConfig }>(params).pipe(map(data => data.images));
  }

  getGuestSession$(params: string): Observable<GuestSession> {
    return this.http.get<GuestSession>(params);
  }

  rateMovieOrTv$(params: string, rating: MovieRatingValue): Observable<MovieRating> {
    return this.http.post<MovieRating>(params, rating);
  }
}
