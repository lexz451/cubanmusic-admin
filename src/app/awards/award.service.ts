import { ApiService } from './../@shared/services/api.service';
import { Award } from './../@shared/models/award';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AwardService {

  constructor(
    private apiService: ApiService
  ) { }

  getAll(): Observable<Award[]> {
    return this.apiService.get<Award[]>('/awards');
  }

  getById(id: number): Observable<Award> {
    return this.apiService.get<Award>(`/awards/${id}`);
  }

  createAward(award: Award): Observable<void> {
    return this.apiService.post('/awards/new', award);
  }

  updateAward(award: Award): Observable<void> {
    return this.apiService.put(`/awards/${award.id}`, award);
  }

}
