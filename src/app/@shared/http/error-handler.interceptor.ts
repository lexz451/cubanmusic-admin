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
  constructor(private _uiService: UiService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(2),
      catchError((error) => this.errorHandler(error))
    );
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    }

    let errorMessage = 'Ocurrio un error inesperado. Intente nuevamente.';

    if (response instanceof ErrorEvent) {
      log.error('An error ocurred on the client side.');
      errorMessage = 'Ocurrio un error inesperado. Revise su conexion a internet.';
    } else {
      if (response.error) {
        if (response.status == 401 || response.status == 403) {
          errorMessage = 'Su sesion expiro o no tiene permisos para acceder. Inicie sesion.';
        } else {
          errorMessage = response.error.message || response.error || 'Error desconocido. Intente nuevamente.';
        }
      }
    }

    this._uiService.notifyError(errorMessage);

    return throwError(response);
  }
}
