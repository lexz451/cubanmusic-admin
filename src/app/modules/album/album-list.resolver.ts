import { AlbumService } from './album.service';
import { forkJoin } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlbumListResolver implements Resolve<any> {
  constructor(private albumService: AlbumService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return forkJoin([this.albumService.artists, this.albumService.recordLabels, this.albumService.getAll()]);
  }
}
