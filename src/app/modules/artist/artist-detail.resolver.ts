import { forkJoin, of } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ArtistsService } from './artist.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistDetailResolver implements Resolve<any> {
  constructor(private artistService: ArtistsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id;
    return forkJoin([
      id ? this.artistService.getById(id) : of(null),
      this.artistService.locations$,
      this.artistService.jobTitles$,
      this.artistService.albums$,
      this.artistService.awards$,
      this.artistService.organizations$,
      this.artistService.genres$,
      this.artistService.instruments$,
      this.artistService.artists$,
      this.artistService.recordLabels$,
    ]);
  }
}
