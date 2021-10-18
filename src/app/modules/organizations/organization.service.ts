import { Organization } from '../../@shared/models/organization';
import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { Observable } from 'rxjs';
import { Country } from '@shared/models/country';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Organization[]> {
    return this.apiService.get<Organization[]>('/organizations');
  }

  getById(id: number): Observable<Organization> {
    return this.apiService.get<Organization>(`/organizations/${id}`);
  }

  createOrg(org: Organization): Observable<void> {
    return this.apiService.post<void, Organization>('/organizations/new', org);
  }

  updateOrg(org: Organization): Observable<void> {
    return this.apiService.put<void, Organization>(`/organizations/${org.id}`, org);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(`/organizations/${id}`);
  }

  get countries(): Observable<Country[]> {
    return this.apiService.get('/countries');
  }
}
