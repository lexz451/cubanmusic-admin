import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { CredentialsService } from '../../auth/credentials.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(private _credentialsService: CredentialsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userCredentials = this._credentialsService.credentials;
    const isSignIn = userCredentials && userCredentials.accessToken && userCredentials.tokenType;
    const isApiRequest = req.url.includes(environment.serverUrl);
    if (isSignIn && isApiRequest) {
      req = req.clone({
        setHeaders: {
          Authorization: `${userCredentials.tokenType} ${userCredentials.accessToken}`,
        },
      });
    }
    return next.handle(req);
  }
}
