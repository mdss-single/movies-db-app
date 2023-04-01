import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
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
  castMapper
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
  SearchCard,
  SearchCardDTO
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
        if (options?.partial) {
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

  getImageConfig$(params: string): Observable<ImageConfig> {
    return this.http.get<{ images: ImageConfig }>(params).pipe(map(data => data.images));
  }
}
