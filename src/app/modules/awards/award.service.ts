import { DataService } from '@app/@shared/services/data.service';
import { Country } from '../../@shared/models/country';
import { ApiService } from '../../@shared/services/api.service';
import { Award } from '../../@shared/models/award';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AwardService {
  constructor(
    private apiService: ApiService,
    private dataService: DataService
  ) {}

  getAll(): Observable<Award[]> {
    return this.apiService.get<Award[]>('/awards');
  }

  getById(id: number): Observable<Award> {
    return this.apiService.get<Award>(`/awards/${id}`);
  }

  create(award: Award): Observable<void> {
    return this.apiService.post('/awards/new', award);
  }

  update(award: Award): Observable<void> {
    return this.apiService.put(`/awards/${award.id}`, award);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(`/awards/${id}`);
  }

  get countries() {
    return this.dataService.countries;
  }

  get organizations() {
    return this.dataService.organizations;
  }
}
