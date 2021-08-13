import { map, tap } from 'rxjs/operators';
import { Credentials } from './../@core/model/auth-response';
import { SignInRequest } from './../@core/model/signin-request';
import { ApiService } from './../@core/api.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CredentialsService } from './credentials.service';

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _credentialsService: CredentialsService, private _apiService: ApiService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  signIn(context: SignInRequest): Observable<Credentials> {
    return this._apiService.post<Credentials, SignInRequest>('/auth/signin', context).pipe(
      tap((response) => {
        this._credentialsService.setCredentials(response, context.rememberMe);
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    this._credentialsService.setCredentials();
    return of(true);
  }
}
