import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@env/environment';
import { ApiPrefixInterceptor, ErrorHandlerInterceptor, RouteReusableStrategy, SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UnauthorizedInterceptor } from './auth/unauthorized.interceptor';
import { JWTInterceptor } from './auth/jwt.interceptor';
import { DatePipe } from '@angular/common';
import { LottiePlayerFactoryOrLoader } from 'ngx-lottie/lib/symbols';
import { LottieModule } from 'ngx-lottie';
import { NotifierModule } from 'angular-notifier';

const lottieFactory: LottiePlayerFactoryOrLoader = () =>
  import(/* webpackChunkName: 'lottie-web' */ 'lottie-web/build/player/lottie_light');

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    RouterModule,
    LottieModule.forRoot({ player: lottieFactory }),
    TranslateModule.forRoot(),
    NgbModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12,
        },
        vertical: {
          position: 'top',
          distance: 24,
        },
      },
    }),
    SharedModule,
    ShellModule,
    HomeModule,
    AuthModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
