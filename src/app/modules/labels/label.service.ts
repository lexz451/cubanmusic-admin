import { Country } from '../../@shared/models/country';
import { Observable } from 'rxjs';
import { Recordlabel } from '../../@shared/models/recordlabel';
import { ApiService } from '../../@shared/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Recordlabel[]> {
    return this.apiService.get<Recordlabel[]>('/recordlabels');
  }

  getById(id: number): Observable<Recordlabel> {
    return this.apiService.get<Recordlabel>(`/recordlabels/${id}`);
  }

  update(label: Recordlabel): Observable<void> {
    return this.apiService.put<void, Recordlabel>(`/recordlabels/${label.id}`, label);
  }

  create(label: Recordlabel): Observable<void> {
    return this.apiService.post<void, Recordlabel>('/recordlabels/new', label);
  }

  delete(id: any): Observable<void> {
    return this.apiService.delete(`/recordlabels/${id}`);
  }

  get countries(): Observable<Country[]> {
    return this.apiService.get('/countries');
  }
}
