import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  map,
  Observable
} from 'rxjs';
import { SearchMediaType } from '../enums/search';
import { ImageConfig } from '../interfaces/image-config';
import {
  MovieDTO,
  MovieShortCard
} from '../interfaces/movies';
import { SearchCard } from '../interfaces/search';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {}

  search$(params: string): Observable<SearchCard[]> {
    return this.http.get<{ results: any[] }>(params).pipe(
      map(data => data.results.map(result => ({
        id: result.id,
        title: result.media_type === SearchMediaType.Movie ? result.title : result.name,
        poster: result.media_type === SearchMediaType.Person ? result.profile_path : result.poster_path,
        type: result.media_type,
        rating: result.vote_average ?? null,
        date: result.media_type === SearchMediaType.Person ? null :
          result.media_type === SearchMediaType.Movie ? result.release_date : result.first_air_date,
      }))),
    );
  }

  getMovies$(params: string): Observable<MovieShortCard[]> {
    return this.http.get<{ results: any[] }>(params).pipe(
      map(data => data.results.map(result => ({
        id: result.id,
        type: result.title ? 'movie' : 'tv',
        title: result.title || result.name,
        poster: result.poster_path,
        rating: result.vote_average,
        date: result.release_date || result.first_air_date,
      }))),
    );
  }

  getTvShows$(params: string): Observable<MovieDTO[]> {
    return this.http.get<{ results: MovieDTO[] }>(params).pipe(map(data => data.results));
  }

  getImageConfig$(params: string): Observable<ImageConfig> {
    return this.http.get<{ images: ImageConfig }>(params).pipe(map(data => data.images));
  }
}
