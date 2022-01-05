import { forkJoin } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ArtistsService } from './artist.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistListResolver implements Resolve<any> {
  constructor(private artistService: ArtistsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return forkJoin([this.artistService.jobTitles$, this.artistService.getAll()]);
  }
}
