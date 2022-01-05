import { tap, catchError } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { CacheService } from '../services/cache.service';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(
    private cacheService: CacheService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cachedResponse = null;
    if (req.method === 'GET') {
      cachedResponse = this.cacheService.get(req);
      if (cachedResponse) {
        console.log(`Response from cache for ${req.urlWithParams}`, cachedResponse);
      }
    } else if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE') {
      const removedFromCache = this.cacheService.delete(req);
      if (removedFromCache) {
        console.log(`Cleared ${req.urlWithParams} from cache`, cachedResponse);
      }
    }
    return next.handle(req).pipe(
      tap((e) => {
        if (e instanceof HttpResponse) {
          this.cacheService.put(req, e);
        }
        return cachedResponse ? cachedResponse : e;
      }),
      catchError((e) => {
        return throwError(e);
      })
    )
  }
}
