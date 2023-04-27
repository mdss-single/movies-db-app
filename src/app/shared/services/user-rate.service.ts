import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
  take,
  tap
} from 'rxjs';
import { ApiRequestType } from '../enums/api-request';
import { MediaType } from '../enums/media-types';
import { GuestSession } from '../interfaces/general';
import {
  MovieRating,
  MovieRatingCard,
} from '../interfaces/movies';
import { ApiService } from './api.service';
import { GuestSessionService } from './guest-session.service';
import { LocalStorageService } from './local-storage.service';

type RatedList = Map<number, number>;
type Rating = number;

@Injectable({
  providedIn: 'root'
})
export class UserRateService {
  private _guestRatedMovies = new BehaviorSubject<RatedList>(new Map());
  private _guestRatedTv = new BehaviorSubject<RatedList>(new Map());
  private sessionInStorage = this.guestSessionService.guestSessionInStorage;

  private get guestRatedMovies(): RatedList {
    return this._guestRatedMovies.value;
  }

  private get guestRatedTv(): RatedList {
    return this._guestRatedTv.value;
  }

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private guestSessionService: GuestSessionService,
  ) {}

  public init(): void | Observable<MovieRatingCard[][]> {
    if (!this.sessionInStorage) {
      return;
    }

    return this.getRatedList$(this.sessionInStorage);
  }

  public getRatingValue$(type: MediaType, id: number): Observable<Rating | undefined> {
    if (type === MediaType.Movie) {
      return this.getRatedMovie(id);
    }

    if (type === MediaType.Tv) {
      return this.getRatedTv(id);
    }

    throw new Error('No item by this media type');
  }

  public setRate$(type: MediaType, id: number, rating: number): Observable<MovieRating> {
    const rateParams = `${type}/${id}/${ApiRequestType.Rating}`;
    const rateValue = {
      value: rating,
    };

    if (this.sessionInStorage) {
      return this.apiService.rateMovieOrTv$(rateParams + this.sessionInStorage, rateValue).pipe(
        tap((_: MovieRating) => {
          this.updateRateList(type, id, rating);
        }),
      );
    }

    return this.guestSessionService.getGuestSession$().pipe(
      switchMap((session: GuestSession) => this.apiService.rateMovieOrTv$(rateParams + session.guest_session_id, rateValue)),
      tap((_: MovieRating) => {
        this.guestSessionService.saveGuestSessionInStorage();
        this.updateRateList(type, id, rating);
      }),
    );
  }

  private getRatedList$(sessionId: string): Observable<MovieRatingCard[][]> {
    const moviesEndpoint = ApiRequestType.RatedMoviesPrefix + sessionId + ApiRequestType.RatedMoviesTail;
    const tvEndpoint = ApiRequestType.RatedTvPrefix + sessionId + ApiRequestType.RatedTvTail;

    const movieList$ = this.apiService.getRatedMoviesList$(moviesEndpoint);
    const tvList$ = this.apiService.getRatedTvList$(tvEndpoint);

    return combineLatest([movieList$, tvList$]).pipe(
      take(1),
      tap(([movieList, tvList]) => {
        this.setRatedMovieList(movieList);
        this.setRatedTvList(tvList);
      })
    );
  }

  private getRatedMovie(id: number): Observable<number | undefined> {
    return this._guestRatedMovies.pipe(
      map((list: RatedList) => list.get(id)),
    );
  }

  private getRatedTv(id: number): Observable<number | undefined> {
    return this._guestRatedTv.pipe(
      map((list: RatedList) => list.get(id)),
    );
  }

  private updateRateList(type: MediaType, id: number, rating: number): void {
    if (type === MediaType.Movie) {
      this.updateRatedMovieList(id, rating);
      return;
    }

    if (type === MediaType.Tv) {
      this.updateRatedTvList(id, rating);
      return;
    }

    throw new Error('Wrong media type');
  }

  private updateRatedMovieList(id: number, rating: Rating): void {
    const movieList = this.guestRatedMovies;
    movieList.set(id, rating);
    this._guestRatedMovies.next(movieList);
  }

  private updateRatedTvList(id: number, rating: Rating): void {
    const tvList = this.guestRatedTv;
    tvList.set(id, rating);
    this._guestRatedMovies.next(tvList);
  }

  private setRatedMovieList(movieList: MovieRatingCard[]): void {
    const mappedMovies = new Map(movieList.map(({id, rating}: MovieRatingCard) => [id, rating]));
    this._guestRatedMovies.next(mappedMovies);
  }

  private setRatedTvList(tvList: MovieRatingCard[]): void {
    const mappedTv = new Map(tvList.map(({id, rating}: MovieRatingCard) => [id, rating]));
    this._guestRatedTv.next(mappedTv);
  }
}
