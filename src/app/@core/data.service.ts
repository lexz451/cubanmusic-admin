import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Country } from './model/country';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  genderSelectors: any[] = [
    {
      id: 0,
      name: 'Hombre',
    },
    {
      id: 1,
      name: 'Mujer',
    },
    {
      id: 2,
      name: 'Otro',
    },
  ];

  get countries(): Observable<Country[]> {
    return this._apiService.get<Country[]>('/countries');
  }

  constructor(private _apiService: ApiService) {}
}
