import { Injectable } from '@angular/core';
import {
  Observable,
  take,
  tap
} from 'rxjs';
import { ApiRequestType } from '../enums/api-request';
import { LocalStorageKeys } from '../enums/local-storage';
import { GuestSession } from '../interfaces/general';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GuestSessionService {
  private _guestSession = '';
  public guestSessionInStorage = this.localStorage.getItem(LocalStorageKeys.GuestSession);

  get guestSession(): string {
    return this._guestSession;
  }

  set guestSession(value: string) {
    this._guestSession = value;
  }

  constructor(
    private apiService: ApiService,
    private localStorage: LocalStorageService,
  ) {}

  public getGuestSession$(): Observable<GuestSession> {
    return this.apiService.getGuestSession$(ApiRequestType.GuestSession).pipe(
      take(1),
      tap((value: GuestSession) => {
        this.guestSession = value.guest_session_id;
      }),
    );
  }

  public saveGuestSessionInStorage(): void {
    this.localStorage.setItem(LocalStorageKeys.GuestSession, this.guestSession);
  }
}
