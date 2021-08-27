import { Injectable } from '@angular/core';
import { Credentials } from '@app/@shared/models/credentials';
import { LoginContext } from '@app/@shared/models/login-context';
import { ApiService } from '@app/@shared/services/api.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CredentialsService } from './credentials.service';

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private apiService: ApiService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<Credentials> {
    return this.apiService.post<Credentials, any>('/auth/signin', context).pipe(
      tap((res) => {
        this.credentialsService.setCredentials(res, context.remember);
      })
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
