import { Injectable } from '@angular/core';
import { Artist } from '@app/@shared/models/artist';
import { Quote } from '@app/@shared/models/quote';
import { ApiService } from '@app/@shared/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Artist[]> {
    return this.apiService.get<Artist[]>('/persons');
  }

  getById(id: number): Observable<Artist> {
    return this.apiService.get<Artist>(`/persons/${id}`);
  }

  updateArtist(artist: Artist): Observable<void> {
    return this.apiService.put<void, Artist>(`/persons/${artist.id}`, artist);
  }

  createArtist(artist: Artist): Observable<void> {
    return this.apiService.post<void, Artist>('/persons/new', artist);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(`/persons/${id}`);
  }

  createQuote(id: number, quote: Quote): Observable<void> {
    return this.apiService.post<void, Quote>(`/persons/${id}/quote`, quote);
  }
}
