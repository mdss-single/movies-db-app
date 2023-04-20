import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  switchMap,
  take,
  tap
} from 'rxjs';
import { ApiRequestType } from '../enums/api-request';
import { LocalStorageKeys } from '../enums/local-storage';
import { GuestSession } from '../interfaces/general';
import { MovieShortCard } from '../interfaces/movies';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserRateService {
  private _guestSession$ = new BehaviorSubject<string>('');
  private _guestRatedMovies$ = new BehaviorSubject<MovieShortCard[]>([]);
  private _guestRatedTv$ = new BehaviorSubject<MovieShortCard[]>([]);

  get guestSession(): string {
    return this._guestSession$.value;
  }

  get guestRatedMovies(): MovieShortCard[] {
    return this._guestRatedMovies$.value;
  }

  get guestRatedTv(): MovieShortCard[] {
    return this._guestRatedTv$.value;
  }

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
  ) {}

  public init(): Observable<GuestSession> | Observable<MovieShortCard[]> {
    const guestSessionInStorage = this.localStorage.getItem(LocalStorageKeys.GuestSession);

    if (guestSessionInStorage) {
      return this.setSessionAndRateList(guestSessionInStorage);
    }

    return this.apiService.getGuestSession$(ApiRequestType.GuestSession).pipe(
      take(1),
      tap((value) => {
        this.setSessionAndRateList(value.guest_session_id);
      }),
    );
  }

  public setSessionAndRateList(sessionId: string): Observable<MovieShortCard[]> {
    const guestSession = this.localStorage.getItem(LocalStorageKeys.GuestSession);
    if (!guestSession) {
      this.localStorage.setItem(LocalStorageKeys.GuestSession, sessionId);
    }

    this._guestSession$.next(sessionId);
    return this.getRatedList();
  }

  public getRatedList(): Observable<MovieShortCard[]> {
    const sessionId = this.guestSession;
    const moviesEndpoint = ApiRequestType.RatedMoviesPrefix + sessionId + ApiRequestType.RatedMoviesTail;
    const tvEndpoint = ApiRequestType.RatedTvPrefix + sessionId + ApiRequestType.RatedTvTail;

    return this.apiService.getRatedMoviesList$(moviesEndpoint).pipe(
      take(1),
      tap((value) => this._guestRatedMovies$.next(value)),
      switchMap((_) => {
        return this.apiService.getRatedTvList$(tvEndpoint);
      }),
      tap((value: MovieShortCard[]) => this._guestRatedTv$.next(value)),
    )
  }
}
