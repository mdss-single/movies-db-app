import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY } from '../tokens/api-key.token';
import { BASE_URL } from '../tokens/base-url.token';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    @Inject(API_KEY) private apiKey: string,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({ url: this.baseUrl + request.url + '?api_key=' + this.apiKey });

    return next.handle(newRequest);
  }
}
