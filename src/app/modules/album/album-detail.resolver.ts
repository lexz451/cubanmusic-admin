import { AlbumService } from './album.service';
import { forkJoin, EMPTY, of } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlbumDetailResolver implements Resolve<any> {
  constructor(private albumService: AlbumService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id;
    return forkJoin([
      this.albumService.recordLabels,
      this.albumService.artists,
      this.albumService.organizations,
      this.albumService.countries,
      id ? this.albumService.getById(id) : of(null),
    ]);
  }
}
