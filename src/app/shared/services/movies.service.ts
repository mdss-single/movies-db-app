import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../interfaces/movies';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private _movies$ = new BehaviorSubject<Movie[]>([]);

  get movies$(): Observable<Movie[]> {
    return this._movies$.asObservable();
  }

  constructor(private apiService: ApiService) {}

  loadMovies(params: string = '') {
    this.apiService.getMovies$(params).subscribe((movies) => {
      this._movies$.next(movies);
    });
  }

  loadPopularMovies() {
    this.apiService.getMovies$('movie/popular').subscribe((movies) => {
      this._movies$.next(movies);
    });
  }

  loadTopRatedMovies() {
    this.apiService.getMovies$('movie/top_rated').subscribe((movies) => {
      this._movies$.next(movies);
    });
  }
}
