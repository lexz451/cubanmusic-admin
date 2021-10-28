import { Observable } from 'rxjs';
import { ApiService } from '../../@shared/services/api.service';
import { Group } from '../../@shared/models/group';
import { Injectable } from '@angular/core';
import { Article } from '@app/@shared/models/article';
import { Quote } from '@app/@shared/models/quote';
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

  getQuotes(artistID: number): Observable<Quote[]> {
    return this.apiService.get(`/artists/${artistID}/quotes`);
  }

  createQuote(artistID: number, quote: Quote): Observable<void> {
    return this.apiService.post<void, Quote>(`/artists/${artistID}/quotes`, quote);
  }

  deleteQuote(quoteID: number): Observable<void> {
    return this.apiService.delete(`/artists/quotes/${quoteID}`);
  }

  getArticles(artistID: number): Observable<Article[]> {
    return this.apiService.get(`/artists/${artistID}/articles`);
  }

  createArticle(artistID: number, article: Article): Observable<void> {
    return this.apiService.post<void, Article>(`/artists/${artistID}/articles`, article);
  }

  deleteArticle(articleID: number): Observable<void> {
    return this.apiService.delete(`/artists/articles/${articleID}`);
  }
}
