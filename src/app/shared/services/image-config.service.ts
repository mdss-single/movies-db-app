import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  take,
  tap
} from 'rxjs';
import { ApiRequestType } from '../enums/api-request';
import { ImageConfig } from '../interfaces/general';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageConfigService {
  public _imageConfig$ = new BehaviorSubject<ImageConfig>({ base_url: '', poster_sizes: [] });

  get imageConfig(): ImageConfig {
    return this._imageConfig$.value;
  }

  constructor(private apiService: ApiService) {}

  public loadImageConfig(): Observable<ImageConfig> {
    return this.apiService.getImageConfig$(ApiRequestType.Configuration).pipe(
      take(1),
      tap(value => this._imageConfig$.next(value)),
    );
  }
}
