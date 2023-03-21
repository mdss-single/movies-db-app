import { InjectionToken } from '@angular/core';

export const BASE_URL = new InjectionToken('Movie DB Api', {
  factory: () => 'https://api.themoviedb.org/3/',
  providedIn: 'root',
});
