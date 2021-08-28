import { AuthenticationService } from './../../auth/authentication.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e) => {
        return this.handleError(e);
      })
    );
  }

  handleError(e: HttpErrorResponse): Observable<any> {
    const status = e.status;
    if (status == 401 || status == 403) {
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/']);
      });
    }
    return throwError(e);
  }
}
