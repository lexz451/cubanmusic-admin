import { Country } from '../../@shared/models/country';
import { ApiService } from '../../@shared/services/api.service';
import { Venue } from '../../@shared/models/venue';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VenueService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Venue[]> {
    return this.apiService.get('/venues');
  }

  getById(id: number): Observable<Venue> {
    return this.apiService.get(`/venues/${id}`);
  }

  create(venue: Venue): Observable<number> {
    return this.apiService.post('/venues/new', venue);
  }

  update(venue: Venue): Observable<void> {
    return this.apiService.put(`/venues/${venue.id}`, venue);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(`/venues/${id}`);
  }

  get countries(): Observable<Country[]> {
    return this.apiService.get<Country[]>('/countries');
  }
}
