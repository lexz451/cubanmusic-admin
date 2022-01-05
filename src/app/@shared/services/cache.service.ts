import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  cache: { [key: string]: HttpResponse<any> } = {};

  chechableRoutes = [
    '/api/v1/albums',
    //'/api/v1/jobtitles',
    //'/api/v1/instruments'
  ];

  constructor() {}

  get(req: HttpRequest<any>): HttpResponse<any> {
    return this.cache[req.urlWithParams];
  }

  put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    if (this.shouldCache(req.urlWithParams)) {
      this.cache[req.urlWithParams] = res;
    }
  }

  delete(req: HttpRequest<any>): boolean {
    const cachedRequest = this.get(req);
    if (cachedRequest) {
      delete this.cache[req.urlWithParams];
      return true;
    }
    return false;
  }

  shouldCache(urlWithParams: string) {
    return this.chechableRoutes.some(r => {
      return urlWithParams.indexOf(r) != -1;
    });
  }
}
