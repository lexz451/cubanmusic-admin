import { AlbumsService } from './albums.service';
import { forkJoin } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AlbumsResolver implements Resolve<any> {

  constructor(
    private albumsService: AlbumsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return forkJoin([
      this.albumsService.artists,
      this.albumsService.recordLabels,
      this.albumsService.getAll()
    ]);
  }
}
