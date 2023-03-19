import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../interfaces/movies';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private _movies$ = new BehaviorSubject<Movie[]>([]);

  private _popularMovies$ = new BehaviorSubject<Movie[]>([]);
  private _topRatedMovies$ = new BehaviorSubject<Movie[]>([]);
  private _upcomingMovies$ = new BehaviorSubject<Movie[]>([]);

  private _popularTv$ = new BehaviorSubject<Movie[]>([]);
  private _topRatedTv$ = new BehaviorSubject<Movie[]>([]);

  get movies$(): Observable<Movie[]> {
    return this._movies$.asObservable();
  }

  get popularMovies$(): Observable<Movie[]> {
    return this._popularMovies$.asObservable();
  }

  get topRatedMovies$(): Observable<Movie[]> {
    return this._topRatedMovies$.asObservable();
  }

  get upcomingMovies$(): Observable<Movie[]> {
    return this._upcomingMovies$.asObservable();
  }

  get popularTv$(): Observable<Movie[]> {
    return this._popularTv$.asObservable();
  }

  get topRatedTv$(): Observable<Movie[]> {
    return this._topRatedTv$.asObservable();
  }

  constructor(private apiService: ApiService) {}

  loadMovies(params: string = '') {
    this.apiService.getMovies$(params).subscribe((movies) => {
      this._movies$.next(movies);
    });
  }

  loadPopularMovies() {
    this.apiService.getMovies$('movie/popular').subscribe((movies) => {
      this._popularMovies$.next(movies);
    });
  }

  loadTopRatedMovies() {
    this.apiService.getMovies$('movie/top_rated').subscribe((movies) => {
      this._topRatedMovies$.next(movies);
    });
  }

  loadUpcomingMovies() {
    this.apiService.getMovies$('movie/upcoming').subscribe((movies) => {
      this._upcomingMovies$.next(movies);
    });
  }

  loadPopularTv() {
    this.apiService.getTvShows$('tv/popular').subscribe((shows) => {
      this._popularTv$.next(shows);
    });
  }

  loadTopRatedTv() {
    this.apiService.getTvShows$('tv/top_rated').subscribe((shows) => {
      this._topRatedTv$.next(shows);
    });
  }
}
