import { forkJoin, EMPTY, of } from 'rxjs';
import { VenueService } from './venue.service';
import { DataService } from '@app/@shared/services/data.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VenueDetailResolver implements Resolve<any> {
  constructor(private venueService: VenueService, private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id;
    return forkJoin([
      this.dataService.venueTypes$,
      this.dataService.countries$,
      id ? this.venueService.getById(id) : of(null),
    ]);
  }
}
