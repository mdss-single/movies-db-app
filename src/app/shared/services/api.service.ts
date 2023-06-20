import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  filter,
  map,
  Observable,
} from 'rxjs';
import { ApiRequestType } from '../enums/api-request';
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
  ratingMovieTvMapper,
  searchMovieMapper,
  searchPersonMapper,
  searchTvMapper,
  tvMapper,
  movieTvListParamMapper,
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
  MovieRatingCard,
  MovieRatingValue,
  MovieShortCard,
  MovieTvGenre,
  TvDTO
} from '../interfaces/movies';
import {
  PersonDetails,
  PersonDTO
} from '../interfaces/person';
import {
  SearchCard,
  SearchCardDTO,
  SearchParams,
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

  public search$(params: string): Observable<SearchCard[]> {
    return this.http.get<{ results: SearchCardDTO[] }>(params).pipe(
      map((data: { results: SearchCardDTO[] }) => {
        return data.results
          .map((result: SearchCardDTO) => {
            if (!result.media_type) {
              return {} as SearchCard;
            }

            return searchCardMapperFactory[result.media_type](result);
          });
      }),
    );
  }

  public getDefaultMovieOrTvList$(mediaType: MediaType.Movie | MediaType.Tv, params: SearchParams, page: number = 1): Observable<MovieShortCard[]> {
    const requestType = mediaType === MediaType.Movie ? ApiRequestType.MovieDiscover : ApiRequestType.TvDiscover;
    const queryParams = movieTvListParamMapper(params, mediaType);
    const finalQuery = requestType + queryParams + `&${page}`;

    return mediaType === MediaType.Movie ? this.getMovieList$(finalQuery) : this.getTvList$(finalQuery);
  }

  public getMovieList$(params: string): Observable<MovieShortCard[]> {
    return this.http.get<{ results: MovieDTO[] }>(params).pipe(
      map((data: { results: MovieDTO[] }) => {
        return data.results.map((result: MovieDTO) => {
          return movieMapper(result);
        });
      }),
    );
  }

  public getTvList$(params: string): Observable<MovieShortCard[]> {
    return this.http.get<{ results: TvDTO[] }>(params).pipe(
      map((data: { results: TvDTO[] }) => {
        return data.results.map((result: TvDTO) => {
          return tvMapper(result);
        });
      }),
    );
  }

  public getMovieDetails$(params: string): Observable<MovieDetails> {
    return this.http.get<MovieDTO>(params).pipe(
      map((data: MovieDTO) => {
        return movieDetailsMapper(data);
      }),
    );
  }

  public getTvDetails$(params: string): Observable<MovieDetails> {
    return this.http.get<TvDTO>(params).pipe(
      map((data: TvDTO) => {
        return tvDetailsMapper(data);
      }),
    );
  }

  public getMovieOrTvCast$(params: string, options?: MovieDetailsOptions): Observable<CastAndCrew> {
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

  public getPersonDetails$(params: string): Observable<PersonDetails> {
    return this.http.get<PersonDTO>(params).pipe(
      map(data => personMapper(data))
    );
  }

  public getPersonKnowsFor$(params: string, id: number): Observable<SearchCard[]> {
    return this.http.get<{ results: SearchPersonDTO[] }>(params).pipe(
      map((data: { results: SearchPersonDTO[] }) => {
        return data.results.find((person: SearchPersonDTO) => person.id === id);
      }),
      filter(Boolean),
      map((person) => {
        return person.known_for
          .map((card) => card.title ? searchMovieMapper(card) : searchTvMapper(card));
      }),
    );
  }

  public getPersonCast$(params: string): Observable<CastAndCrew> {
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

  public getImageConfig$(params: string): Observable<ImageConfig> {
    return this.http.get<{ images: ImageConfig }>(params).pipe(map(data => data.images));
  }

  public getGuestSession$(params: string): Observable<GuestSession> {
    return this.http.get<GuestSession>(params);
  }

  public getRatedMoviesOrTvList$(params: string): Observable<MovieRatingCard[]> {
    return this.http.get<{ results: MovieDTO[] }>(params).pipe(
      map((data: { results: MovieDTO[] }) => {
        return data.results.map((result: MovieDTO) => {
          return ratingMovieTvMapper(result);
        });
      }),
    );
  }

  public rateMovieOrTv$(params: string, rating: MovieRatingValue): Observable<MovieRating> {
    return this.http.post<MovieRating>(params, rating);
  }

  public getMovieOrTvGenres$(mediaType: MediaType.Movie | MediaType.Tv): Observable<MovieTvGenre[]> {
    const genresReq = mediaType === MediaType.Movie ? ApiRequestType.MovieGenres : ApiRequestType.TvGenres;

    return this.http.get<{ genres: MovieTvGenre[] }>(genresReq).pipe(
      map((value:{ genres: MovieTvGenre[] }) => value.genres)
    );
  }
}
