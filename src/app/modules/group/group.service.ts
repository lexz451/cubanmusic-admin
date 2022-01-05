import { Artist } from './../../@shared/models/artist';
import { Album } from '@app/@shared/models/album';
import { DataService } from './../../@shared/services/data.service';
import { Observable } from 'rxjs';
import { ApiService } from '../../@shared/services/api.service';
import { Group } from '../../@shared/models/group';
import { Injectable } from '@angular/core';
import { Article } from '@app/@shared/models/article';
import { Quote } from '@app/@shared/models/quote';
import { Image } from '@app/@shared/models/image';
@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private apiService: ApiService, private dataService: DataService) {}

  getAll(): Observable<Group[]> {
    return this.apiService.get<Group[]>('/groups');
  }

  getById(id: number): Observable<Group> {
    return this.apiService.get<Group>(`/groups/${id}`);
  }

  update(artist: Group): Observable<void> {
    return this.apiService.put<void, Group>(`/groups/${artist.id}`, artist);
  }

  create(artist: Group): Observable<void> {
    return this.apiService.post<void, Group>('/groups/new', artist);
  }

  delete(id: string): Observable<void> {
    return this.apiService.delete(`/groups/${id}`);
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

  createImage(artistId: string, image: Image): Observable<string> {
    return this.apiService.post<string, Image>(`/artists/${artistId}/images`, image);
  }

  deleteImage(imageId: string): Observable<void> {
    return this.apiService.delete(`/artists/images/${imageId}`);
  }

  createAlbum(album: Album): Observable<string> {
    return this.apiService.post('/albums/new', album);
  }

  createArtist(artist: Artist): Observable<string> {
    return this.apiService.post('/persons/new', artist);
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

  get organizations$() {
    return this.dataService.organizations$;
  }

  get countries$() {
    return this.dataService.countries$;
  }

  get genders() {
    return this.dataService.genders;
  }
}
