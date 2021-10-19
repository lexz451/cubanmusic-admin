import { Observable } from 'rxjs';
import { ApiService } from './../@shared/services/api.service';
import { Injectable } from '@angular/core';
import { User } from './home.component';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _apiService: ApiService) {}

  getUsers(): Observable<any[]> {
    return this._apiService.get('/auth/users');
  }

  getLogs(): Observable<any[]> {
    return this._apiService.get('/logs/latest');
  }

  createUser(user: User): Observable<void> {
    return this._apiService.post('/auth/signup', user);
  }
}
