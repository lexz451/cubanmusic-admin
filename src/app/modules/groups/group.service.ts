import { Observable } from 'rxjs';
import { ApiService } from '../../@shared/services/api.service';
import { Group } from '../../@shared/models/group';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Group[]> {
    return this.apiService.get<Group[]>('/groups');
  }

  getById(id: number): Observable<Group> {
    return this.apiService.get<Group>(`/groups/${id}`);
  }

  updateGroup(artist: Group): Observable<void> {
    return this.apiService.put<void, Group>(`/groups/${artist.id}`, artist);
  }

  createGroup(artist: Group): Observable<void> {
    return this.apiService.post<void, Group>('/groups/new', artist);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(`/groups/${id}`);
  }
}
