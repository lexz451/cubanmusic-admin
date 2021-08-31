import { ApiService } from './../@shared/services/api.service';
import { Album } from './../@shared/models/albums';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Album[]> {
    return this.apiService.get('/albums');
  }

  getById(id: number): Observable<Album> {
    return this.apiService.get(`/albums/${id}`);
  }

  create(album: Album): Observable<void> {
    return this.apiService.post('/albums/new', album);
  }

  update(album: Album): Observable<void> {
    return this.apiService.put(`/albums/${album.id}`, album);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(`/albums/${id}`);
  }
}
