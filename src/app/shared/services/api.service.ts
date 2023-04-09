import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  filter,
  map,
  Observable
} from 'rxjs';
import { MediaType } from '../enums/media-types';
import {
  castCrewMapper,
  castMovieMapper,
  castTvMapper,
  movieDetailsMapper,
  movieMapper,
  personMapper,
  searchMovieMapper,
  searchPersonMapper,
  searchTvMapper,
  tvMapper
} from '../helpers';
import {
  CastAndCrew,
  CastAndCrewDTO,
  CastCard,
  CastDTO
} from '../interfaces/cast';
import { ImageConfig } from '../interfaces/image-config';
import {
  MovieDetails,
  MovieDetailsOptions,
  MovieDTO,
  MovieShortCard
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

  getMovies$(params: string): Observable<MovieShortCard[]> {
    return this.http.get<{ results: MovieDTO[] }>(params).pipe(
      map(data => {
        return data.results.map((result) => {
          return result.title ? movieMapper(result) : tvMapper(result);
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

  getMovieCast$(params: string, options?: MovieDetailsOptions): Observable<CastAndCrew> {
    return this.http.get<CastAndCrewDTO>(params).pipe(
      map((data: CastAndCrewDTO) => {
        let castArr = data.cast.map((castItem: CastDTO) => {
          return castItem.title ? castMovieMapper(castItem) : castTvMapper(castItem);
        });
        const crewArr = data.crew.map((castItem: CastDTO) => castCrewMapper(castItem));

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
    return this.http.get<CastAndCrewDTO>(params).pipe(
      map((data: CastAndCrewDTO) => ({
        cast: data.cast
          .map((castItem: CastDTO) => {
            return castItem.title ? castMovieMapper(castItem) : castTvMapper(castItem);
          })
          .sort((a: CastCard, b: CastCard) => {
            const getDateMs = (date: Date) => new Date(date).getTime();
            return getDateMs(b.date) - getDateMs(a.date);
          }),
        crew: data.crew.map((castItem: CastDTO) => castCrewMapper(castItem)),
      })),
    );
  }

  getImageConfig$(params: string): Observable<ImageConfig> {
    return this.http.get<{ images: ImageConfig }>(params).pipe(map(data => data.images));
  }
}
