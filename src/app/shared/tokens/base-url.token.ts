import { InjectionToken } from '@angular/core';

export const BASE_URL = new InjectionToken('Movie DB Api', {
  factory: () => 'http://api.themoviedb.org/3/',
  providedIn: 'root',
});
