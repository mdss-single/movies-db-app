import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageConfig } from '../interfaces/image-config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageConfigService {
  public _imageConfig$ = new BehaviorSubject<ImageConfig>({ base_url: '', poster_sizes: [] });

  get imageConfig$(): Observable<ImageConfig> {
    return this._imageConfig$.asObservable();
  }

  get imageConfig(): ImageConfig {
    return this._imageConfig$.value;
  }

  constructor(private apiService: ApiService) {
    this.loadImageConfig();
  }

  public loadImageConfig(): void {
    this.apiService.getImageConfig$('configuration').subscribe(config => {
      this._imageConfig$.next(config);
    });
  }
}
