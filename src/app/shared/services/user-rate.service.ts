import { Injectable } from '@angular/core';
import {
  Observable,
  switchMap,
  take,
  tap
} from 'rxjs';
import { ApiRequestType } from '../enums/api-request';
import { LocalStorageKeys } from '../enums/local-storage';
import { MediaType } from '../enums/media-types';
import {
  GuestSession,
  RatedCard
} from '../interfaces/general';
import { MovieShortCard } from '../interfaces/movies';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserRateService {
  // private _guestSession$ = new BehaviorSubject<string>('');
  // private _guestRatedMovies$ = new BehaviorSubject<MovieShortCard[]>([]);
  // private _guestRatedTv$ = new BehaviorSubject<MovieShortCard[]>([]);

  private _guestSession = '';
  private _guestRatedMovies = new Map();
  private _guestRatedTv = new Map();

  // get guestSession(): string {
  //   return this._guestSession$.value;
  // }
  //
  // get guestRatedMovies(): MovieShortCard[] {
  //   return this._guestRatedMovies$.value;
  // }
  //
  // get guestRatedTv(): MovieShortCard[] {
  //   return this._guestRatedTv$.value;
  // }

  get guestSession(): string {
    return this._guestSession;
  }

  get guestRatedMovies(): RatedCard[] {
    return Array.from(this._guestRatedMovies).map(([id, rating]) => ({
      id,
      rating,
    }));

    // return this._guestRatedMovies;
  }

  get guestRatedTv(): RatedCard[] {
    return Array.from(this._guestRatedTv).map(([id, rating]) => ({
      id,
      rating,
    }));

    // return this._guestRatedTv;
  }

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
  ) {}

  public init(): Observable<GuestSession> | Observable<RatedCard[]> {
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

  public updateRateList(type: MediaType, id: number, rating: number): void {
    const list = type === MediaType.Movie ?
      this.guestRatedMovies : this.guestRatedTv;

    const itemExist = list.find((item) => item.id === id);

    if (itemExist) {
      itemExist.rating = rating;
      return;
    }

    list.push({ id, rating });
  }

  private setSessionAndRateList(sessionId: string): Observable<RatedCard[]> {
    this.localStorage.setItem(LocalStorageKeys.GuestSession, sessionId);
    this._guestSession = sessionId;

    return this.getRatedList();
  }

  private getRatedList(): Observable<RatedCard[]> {
    const sessionId = this.guestSession;
    const moviesEndpoint = ApiRequestType.RatedMoviesPrefix + sessionId + ApiRequestType.RatedMoviesTail;
    const tvEndpoint = ApiRequestType.RatedTvPrefix + sessionId + ApiRequestType.RatedTvTail;

    return this.apiService.getRatedMoviesList$(moviesEndpoint).pipe(
      take(1),
      tap((movieList: MovieShortCard[]) => {
        movieList.forEach((movie: MovieShortCard) => {
          this._guestRatedMovies.set(movie.id, movie.rating);
        });
        console.log(this._guestRatedMovies)
      }),
      switchMap((_) => {
        return this.apiService.getRatedTvList$(tvEndpoint);
      }),
      tap((movieList: MovieShortCard[]) => {
        movieList.forEach((movie: MovieShortCard) => {
          this._guestRatedTv.set(movie.id, movie.rating);
        })

        console.log(this._guestRatedTv)
      }),
    )
  }
}
