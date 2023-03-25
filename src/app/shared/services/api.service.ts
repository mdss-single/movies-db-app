import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ImageConfig } from '../interfaces/image-config';
import { MovieDTO } from '../interfaces/movies';
import { SearchCardDTO } from '../interfaces/search';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {}

  search$(params: string): Observable<SearchCardDTO[]> {
    return this.http.get<{ results: SearchCardDTO[] }>(params).pipe(map(data => data.results));
  }

  getMovies$(params: string): Observable<MovieDTO[]> {
    return this.http.get<{ results: MovieDTO[] }>(params).pipe(map(data => data.results));
  }

  getTvShows$(params: string): Observable<MovieDTO[]> {
    return this.http.get<{ results: MovieDTO[] }>(params).pipe(map(data => data.results));
  }

  getImageConfig$(params: string): Observable<ImageConfig> {
    return this.http.get<{ images: ImageConfig }>(params).pipe(map(data => data.images));
  }
}
