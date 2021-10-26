import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor(private _httpClient: HttpClient) {}

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this._httpClient.get<T>(url, {
      headers: this._headers,
      params,
    });
  }

  post<T, D>(url: string, data: D, ignoreLoadingBar = false): Observable<T> {
    if (ignoreLoadingBar) {
      this._headers = this._headers.append('ignoreLoadingBar', '');
    } else {
      this._headers = this._headers.delete('ignoreLoadingBar');
    }
    return this._httpClient.post<T>(url, data, {
      headers: this._headers,
    });
  }

  put<T, D>(url: string, data: D): Observable<T> {
    return this._httpClient.put<T>(url, data, {
      headers: this._headers,
    });
  }

  delete<T>(url: string): Observable<T> {
    return this._httpClient.delete<T>(url);
  }
}
