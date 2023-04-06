import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  filter,
  map,
  Observable
} from 'rxjs';
import { SearchMediaType } from '../enums/search';
import {
  movieMapper,
  tvMapper,
  searchMovieMapper,
  searchPersonMapper,
  searchTvMapper,
  movieDetailsMapper,
  castMapper,
  personMapper
} from '../helpers';
import {
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

const searchCardMapperFactory: {[key in SearchMediaType]: (value: SearchCardDTO) => SearchCard } = {
  [SearchMediaType.Movie]: searchMovieMapper,
  [SearchMediaType.Tv]: searchTvMapper,
  [SearchMediaType.Person]: searchPersonMapper,
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

  getMovieCast$(params: string, options?: MovieDetailsOptions): Observable<CastCard[]> {
    return this.http.get<{ cast: CastDTO[] }>(params).pipe(
      map(data => {
        if (options?.topTen) {
          return data.cast.slice(0, 9).map((result) => {
            return castMapper(result);
          });
        }

        return data.cast.map((result) => {
          return castMapper(result);
        });
      }),
    );
  }

  getMovieCrew$(params: string): Observable<CastCard[]> {
    return this.http.get<{ crew: CastDTO[] }>(params).pipe(
      map(data => {
        return data.crew.map((result) => {
          return castMapper(result);
        });
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

  getPersonCast$(params: string): Observable<{ cast: CastCard[], crew: CastCard[] }> {
    return this.http.get<{ cast: CastDTO[], crew: CastDTO[] }>(params).pipe(
      map((data) => ({
        cast: data.cast.map((castItem) => castMapper(castItem)),
        crew: data.crew.map((castItem) => castMapper(castItem)),
      })),
    );
  }

  getImageConfig$(params: string): Observable<ImageConfig> {
    return this.http.get<{ images: ImageConfig }>(params).pipe(map(data => data.images));
  }
}
