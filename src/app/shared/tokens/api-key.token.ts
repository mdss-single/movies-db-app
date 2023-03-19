import { InjectionToken } from '@angular/core';

export const API_KEY = new InjectionToken('Super secure token', {
  factory: () => 'd95eb3ffae7e5a7f80dda10e9e750a9a',
  providedIn: 'root',
});
