import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  take,
  tap
} from 'rxjs';
import { ApiRequestType } from '../enums/api-request';
import { GuestSession } from '../interfaces/general';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GuestSessionService {
  public _guestSession$ = new BehaviorSubject<string>('');

  get guestSession(): string {
    return this._guestSession$.value;
  }

  constructor(private apiService: ApiService) {}

  public getGuestSession(): Observable<GuestSession> {
    return this.apiService.getGuestSession$(ApiRequestType.GuestSession).pipe(
      take(1),
      tap(value => this._guestSession$.next(value.guest_session_id)),
    );
  }
}
