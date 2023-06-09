import {
  HTTP_INTERCEPTORS,
  HttpClientModule
} from '@angular/common/http';
import {
  APP_INITIALIZER,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { BaseUrlInterceptor } from './shared/interceptors/base-url.interceptor';
import { MapResponseInterceptor } from './shared/interceptors/map-response.interceptor';
import { UserRateService } from './shared/services/user-rate.service';
import { ImageConfigService } from './shared/services/image-config.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HeaderComponent,
        FooterComponent
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MapResponseInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (imageConfig: ImageConfigService) => () => imageConfig.loadImageConfig(),
      multi: true,
      deps: [ImageConfigService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (userRateService: UserRateService) => () => userRateService.init(),
      multi: true,
      deps: [UserRateService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
