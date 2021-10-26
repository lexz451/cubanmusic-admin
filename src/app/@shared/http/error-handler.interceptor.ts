import { Router } from '@angular/router';
import { AuthenticationService } from './../../auth/authentication.service';
import { UiService } from './../services/ui.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private _uiService: UiService, private _authService: AuthenticationService, private _router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(2),
      catchError((error) => this.errorHandler(error))
    );
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (!environment.production) {
      log.error('HttpErrorResponse', response.message || response.error?.message, response);
    }

    let errorMessage = 'Ocurrio un error inesperado. Intente nuevamente.';

    if (response.error) {
      if (response.status == 401 || response.status == 403) {
        errorMessage = 'Su sesion expiro o no tiene permisos para acceder. Inicie sesion.';
        this._authService.logout().subscribe(() => {
          this._router.navigate(['/']);
        });
      } else if (response.status == 0) {
        errorMessage = 'No se pudo contactar con el servidor. Revise su conexion a Internet e intente nuevamente.';
      } else if (response.status == 500) {
        errorMessage = 'Error en el servidor: ' + response.error?.message || response.message;
      } else {
        errorMessage = 'Error desconocido. Intente nuevamente.';
      }
    }

    this._uiService.notifyError(errorMessage);

    return throwError(response);
  }
}
