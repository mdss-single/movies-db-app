import { TestBed } from '@angular/core/testing';

import { MapResponseInterceptor } from './map-response.interceptor';

describe('MapResponseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MapResponseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MapResponseInterceptor = TestBed.inject(MapResponseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
