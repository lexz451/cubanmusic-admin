import { map, takeUntil, shareReplay, tap, finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  cache$: Map<string, Observable<any>> = new Map();

  private _headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor(private _httpClient: HttpClient) {

  }

  private invalidateCache(): void {
    this.cache$ = new Map();
  }

  private fetch<T>(url: string, params = new HttpParams()): Observable<T> {
    return this._httpClient.get<T>(url, {
      headers: this._headers,
      params
    })
  }

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this._httpClient.get<T>(url, {
      headers: this._headers,
      params
    })
  }

  post<T, D>(url: string, data: D, ignoreLoadingBar = false): Observable<T> {
    this.invalidateCache();
    return this._httpClient.post<T>(url, data, {
      headers: this._headers,
    });
  }

  postMultipart(url: string, formData: FormData): Observable<any> {
    this.invalidateCache();
    return this._httpClient.post(url, formData);
  }

  put<T, D>(url: string, data: D): Observable<T> {
    this.invalidateCache();
    return this._httpClient.put<T>(url, data, {
      headers: this._headers,
    });
  }

  delete<T>(url: string): Observable<T> {
    this.invalidateCache();
    return this._httpClient.delete<T>(url);
  }
}
