import { Observable } from 'rxjs';
import { ApiService } from '../../@shared/services/api.service';
import { Injectable } from '@angular/core';
import { User } from './home.component';
import { Log } from '@app/@shared/models/log';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _apiService: ApiService) {}

  getUsers(): Observable<any[]> {
    return this._apiService.get('/auth/users');
  }

  getLogs(): Observable<Log[]> {
    return this._apiService.get<Log[]>('/logs');
  }

  createUser(user: User): Observable<void> {
    return this._apiService.post('/auth/signup', user);
  }
}
