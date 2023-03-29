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

function isPerson(person: SearchCardDTO): person is SearchCardDTO {
  return (person as SearchCardDTO).media_type === SearchMediaType.Person;
}

function isMovie(movie: SearchCardDTO): movie is SearchCardDTO {
  return (movie as SearchCardDTO).media_type === SearchMediaType.Movie;
}

function isTv(tv: SearchCardDTO): tv is SearchCardDTO {
  return (tv as SearchCardDTO).media_type === SearchMediaType.Tv;
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
            if (isPerson(result)) {
              return searchPersonMapper(result);
            }

            if (isMovie(result)) {
              return searchMovieMapper(result);
            }

            if (isTv(result)) {
              return searchTvMapper(result);
            }

            return {} as SearchCard;
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
