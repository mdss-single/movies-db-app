import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { ImageConfig } from '../interfaces/image-config';
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

  public loadImageConfig(): void {
    this.apiService.getImageConfig$('configuration').pipe(
      take(1),
    ).subscribe(config => {
      this._imageConfig$.next(config);
    });
  }
}
