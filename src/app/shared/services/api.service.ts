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
  searchTvMapper
} from '../helpers';
import { ImageConfig } from '../interfaces/image-config';
import {
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

  getTvShows$(params: string): Observable<MovieDTO[]> {
    return this.http.get<{ results: MovieDTO[] }>(params).pipe(map(data => data.results));
  }

  getImageConfig$(params: string): Observable<ImageConfig> {
    return this.http.get<{ images: ImageConfig }>(params).pipe(map(data => data.images));
  }
}
