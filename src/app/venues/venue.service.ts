import { Country } from './../@shared/models/country';
import { ApiService } from './../@shared/services/api.service';
import { Venue } from './../@shared/models/venue';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

constructor(
  private apiService: ApiService
) { }

  getAll(): Observable<Venue[]> {
    return this.apiService.get('/venues');
  }

  getById(id: number): Observable<Venue> {
    return this.apiService.get(`/venues/${id}`);
  }

  createVenue(venue: Venue): Observable<void> {
    return this.apiService.post('/venues/new', venue);
  }

  updateVenue(venue: Venue): Observable<void> {
    return this.apiService.put(`/venues/${venue.id}`, venue);
  }

  get countries(): Observable<Country[]> {
    return this.apiService.get<Country[]>('/countries');
  }

}
