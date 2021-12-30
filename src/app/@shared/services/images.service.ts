import { HttpClient, HttpParams } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private httpClient: HttpClient) {}

  deleteImage(id: number): Observable<void> {
    return this.httpClient.delete<void>(`/images/${id}`);
  }

  fetchImages(ids: number[]): Observable<Image[]> {
    return this.httpClient.get<Image[]>(`/images?ids=${ids.join()}`);
  }

  getArtistImages(artistId: number): Observable<Image[]> {
    return this.httpClient.get<Image[]>(`/images/artist/${artistId}`);
  }

  uploadImage(artistId: number, image: Image) {
    const data = new FormData();
    data.append('title', image?.title || '');
    data.append('author', image?.author || '');
    data.append('description', image?.description || '');
    //data.append('file', image.filedata, image.filedata?.name);
    data.append('tags', image.tags.join());
    return this.httpClient.post(`/images/artist/${artistId}/upload`, data);
  }
}
