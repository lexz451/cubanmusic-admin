import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  private API_URL = environment.apiUrl;

  constructor(private _httpClient: HttpClient) {}

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this._httpClient.get<T>(this.API_URL + path, {
      headers: this._headers,
      params,
    });
  }

  post<T, D>(path: string, data: D): Observable<T> {
    return this._httpClient.post<T>(this.API_URL + path, data, {
      headers: this._headers,
    });
  }

  put<T, D>(url: string, data: D): Observable<T> {
    return this._httpClient.put<T>(this.API_URL + url, data, {
      headers: this._headers,
    });
  }

  delete<T>(url: string): Observable<T> {
    return this._httpClient.delete<T>(this.API_URL + url);
  }

  addHeaderParam(key: string, value: string | string[]) {
    this._headers = this._headers.append(key, value);
  }

  removeHeader(key: string): void {
    this._headers = this._headers.delete(key);
  }
}
