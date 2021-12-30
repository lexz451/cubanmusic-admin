import { AlbumsService } from './albums.service';
import { forkJoin, EMPTY, of } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AlbumDetailResolver implements Resolve<any> {
  constructor(
    private albumsService: AlbumsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id;
    return forkJoin([
      this.albumsService.recordLabels,
      this.albumsService.artists,
      this.albumsService.organizations,
      this.albumsService.countries,
      id ? this.albumsService.getById(id) : of(null)
    ])
  }
}
