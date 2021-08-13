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
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(2),
      catchError((error) => this.errorHandler(error))
    );
  }

  // Customize the default error handler here if needed
  private errorHandler(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      if (error.error instanceof ErrorEvent) {
        log.error(`Client error: ${error.error.message || 'Unknown'}.`);
      } else {
        log.error('Web server error');
        if (error.error) {
          if (error.status !== 200) {
            log.error(
              `Description: \n
                status: [${error.status}] \n
                body: [${error.error.message || 'Unknown'}]`
            );
            if (error.status === 401 || error.status === 403) {
              log.error('Unauthorized Exception');
            }
          }
        }
      }
    }

    return throwError(error);
  }
}
