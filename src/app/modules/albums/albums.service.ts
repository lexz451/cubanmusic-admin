import { DataService } from '@app/@shared/services/data.service';
import { ApiService } from '../../@shared/services/api.service';
import { Album } from '../../@shared/models/album';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor(
    private apiService: ApiService,
    private dataService: DataService) {}

  getAll(): Observable<Album[]> {
    return this.apiService.get('/albums');
  }

  getById(id: string): Observable<Album> {
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

  get artists() {
    return this.dataService.artists;
  }

  get recordLabels() {
    return this.dataService.recordLabels;
  }

  get organizations() {
    return this.dataService.organizations;
  }

  get countries() {
    return this.dataService.countries;
  }
}
