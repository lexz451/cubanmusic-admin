import { Album } from '../../@shared/models/album';
import { Injectable } from '@angular/core';
import { Article } from '@app/@shared/models/article';
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

  getById(artistID: number): Observable<Artist> {
    return this.apiService.get<Artist>(`/persons/${artistID}`);
  }

  updateArtist(artist: Artist): Observable<void> {
    return this.apiService.put<void, Artist>(`/persons/${artist.id}`, artist);
  }

  createArtist(artist: Artist): Observable<void> {
    return this.apiService.post<void, Artist>('/persons/new', artist);
  }

  delete(artistID: number): Observable<void> {
    return this.apiService.delete(`/persons/${artistID}`);
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
