import { Country } from './../@shared/models/country';
import { Observable } from 'rxjs';
import { Recordlabel } from '../@shared/models/recordlabel';
import { ApiService } from '../@shared/services/api.service';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(
    private apiService: ApiService
  ) {}

  getAll(): Observable<Recordlabel[]> {
    return this.apiService.get<Recordlabel[]>('/recordlabels');
  }

  getById(id: number): Observable<Recordlabel> {
    return this.apiService.get<Recordlabel>(`/recordlabels/${id}`);
  }

  updateLabel(label: Recordlabel): Observable<void> {
    return this.apiService.put<void, Recordlabel>(`/recordlabels/${label.id}`, label);
  }

  createLabel(label: Recordlabel): Observable<void> {
    return this.apiService.post<void, Recordlabel>('/recordlabels/new', label);
  }

  get countries(): Observable<Country[]> {
    return this.apiService.get<Country[]>('/countries');
  }
}
