import { Image } from './../../@shared/models/image';
import { Album } from '../../@shared/models/album';
import { Injectable } from '@angular/core';
import { Article } from '@app/@shared/models/article';
import { Artist } from '@app/@shared/models/artist';
import { Quote } from '@app/@shared/models/quote';
import { ApiService } from '@app/@shared/services/api.service';
import { Observable } from 'rxjs';
import { DataService } from '@app/@shared/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  constructor(private apiService: ApiService, private dataService: DataService) {}

  getAll(): Observable<Artist[]> {
    return this.apiService.get<Artist[]>('/persons');
  }

  getById(artistID: string): Observable<Artist> {
    return this.apiService.get<Artist>(`/persons/${artistID}`);
  }

  update(artist: Artist): Observable<void> {
    return this.apiService.put<void, Artist>(`/persons/${artist.id}`, artist);
  }

  create(artist: Artist): Observable<void> {
    return this.apiService.post<void, Artist>('/persons/new', artist);
  }

  delete(artistID: string): Observable<void> {
    return this.apiService.delete(`/persons/${artistID}`);
  }

  getQuotes(artistID: string): Observable<Quote[]> {
    return this.apiService.get(`/artists/${artistID}/quotes`);
  }

  createQuote(artistID: string, quote: Quote): Observable<void> {
    return this.apiService.post<void, Quote>(`/artists/${artistID}/quotes`, quote);
  }

  deleteQuote(quoteID: string): Observable<void> {
    return this.apiService.delete(`/artists/quotes/${quoteID}`);
  }

  getArticles(artistID: string): Observable<Article[]> {
    return this.apiService.get(`/artists/${artistID}/articles`);
  }

  createArticle(artistID: string, article: Article): Observable<void> {
    return this.apiService.post<void, Article>(`/artists/${artistID}/articles`, article);
  }

  deleteArticle(articleID: string): Observable<void> {
    return this.apiService.delete(`/artists/articles/${articleID}`);
  }

  getImages(id: string): Observable<Image[]> {
    return this.apiService.get<Image[]>(`/artists/${id}/images`);
  }

  createImage(artistId: string, image: Image): Observable<number> {
    return this.apiService.post<number, Image>(`/artists/${artistId}/images`, image);
  }

  deleteImage(imageId: string): Observable<void> {
    return this.apiService.delete(`/artists/images/${imageId}`);
  }

  get genders() {
    return this.dataService.genders;
  }

  get albums$() {
    return this.dataService.albums$;
  }

  get awards$() {
    return this.dataService.awards$;
  }

  get genres$() {
    return this.dataService.genres$;
  }

  get artists$() {
    return this.dataService.artists$;
  }

  get recordLabels$() {
    return this.dataService.recordLabels$;
  }

  get countries$() {
    return this.dataService.countries$;
  }

  get jobTitles$() {
    return this.dataService.jobTitles$;
  }

  get locations$() {
    return this.dataService.locations$;
  }

  get organizations$() {
    return this.dataService.organizations$;
  }

  get instruments$() {
    return this.dataService.instruments$;
  }
}
