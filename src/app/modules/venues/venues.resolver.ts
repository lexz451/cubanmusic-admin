import { VenueService } from './venue.service';
import { DataService } from '@app/@shared/services/data.service';
import { forkJoin } from 'rxjs';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class VenuesResolver<T> implements Resolve<any> {

  constructor(
    private venueService: VenueService,
    private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return forkJoin([
      this.venueService.getAll(),
      this.dataService.venueTypes
    ]);
  }

}
