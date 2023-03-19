import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pluck } from 'rxjs';
import { ImageConfig } from '../interfaces/image-config';
import { Movie } from '../interfaces/movies';
import { BASE_URL } from '../tokens/base-url.token';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {}

  getMovies$(params: string): Observable<Movie[]> {
    return this.http.get<{ results: Movie[] }>(params).pipe(pluck('results'));
  }

  getImageConfig$(params: string): Observable<ImageConfig> {
    return this.http.get<{ images: ImageConfig }>(params).pipe(pluck('images'));
  }
}
