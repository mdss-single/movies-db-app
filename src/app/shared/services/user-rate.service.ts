import { Injectable } from '@angular/core';
import {
  combineLatest,
  Observable,
  switchMap,
  take,
  tap
} from 'rxjs';
import { ApiRequestType } from '../enums/api-request';
import { MediaType } from '../enums/media-types';
import {
  GuestSession,
  RatedCard
} from '../interfaces/general';
import {
  MovieRating,
  MovieShortCard
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
  private guestSession = '';
  private _guestRatedMovies: RatedList = new Map();
  private _guestRatedTv: RatedList = new Map();

  get guestRatedMovies(): RatedList {
    return this._guestRatedMovies;
  }

  get guestRatedTv(): RatedList {
    return this._guestRatedTv;
  }

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    private guestSessionService: GuestSessionService,
  ) {}

  public init(): void | Observable<RatedCard[]> {
    this.guestSessionService.getGuestSession$().pipe(
      take(1),
      tap((session: GuestSession) => this.guestSession = session.guest_session_id),
      switchMap((session: GuestSession) => this.getRatedList$(session.guest_session_id))
    ).subscribe();
  }

  public getRatedList(type: MediaType, id: number): Rating | undefined {
    if (type === MediaType.Movie) {
      return this.guestRatedMovies.get(id);
    }

    return this.guestRatedTv.get(id);
  }

  public setRate$(type: MediaType, id: number, rating: number): Observable<MovieRating> {
    const rateParams = `${type}/${id}/${ApiRequestType.Rating + this.guestSession}`;
    const rateValue = {
      value: rating,
    };

    return this.apiService.rateMovieOrTv$(rateParams, rateValue)
      .pipe(
        tap((_: MovieRating) => {
          if (!this.guestSessionService.guestSessionInStorage) {
            this.guestSessionService.saveGuestSessionInStorage();
          }

          this.updateRateList(type, id, rating);
        }),
      );
  }

  public updateRateList(type: MediaType, id: number, rating: number): void {
    if (type === MediaType.Movie) {
      this.updateRatedMovieList(id, rating);
      return;
    }

    this.updateRatedTvList(id, rating);
  }

  private updateRatedMovieList(id: number, value: number): void {
    this.guestRatedMovies.set(id, value);
  }

  private updateRatedTvList(id: number, value: number): void {
    this.guestRatedTv.set(id, value);
  }

  private getRatedList$(sessionId: string): Observable<RatedCard[]> | any {
    const moviesEndpoint = ApiRequestType.RatedMoviesPrefix + sessionId + ApiRequestType.RatedMoviesTail;
    const tvEndpoint = ApiRequestType.RatedTvPrefix + sessionId + ApiRequestType.RatedTvTail;

    const movieList$ = this.apiService.getRatedMoviesList$(moviesEndpoint);
    const tvList$ = this.apiService.getRatedTvList$(tvEndpoint);

    return combineLatest([movieList$, tvList$]).pipe(
      take(1),
      tap(([movieList, tvList]) => {
        movieList.forEach((movie: MovieShortCard) => {
          this.updateRatedMovieList(movie.id, movie.rating);
        });

        tvList.forEach((tv: MovieShortCard) => {
          this.updateRatedTvList(tv.id, tv.rating);
        });
      })
    );
  }
}
