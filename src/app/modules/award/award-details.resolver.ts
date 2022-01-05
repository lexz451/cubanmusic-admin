import { AwardService } from './award.service';
import { forkJoin, of } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AwardDetailsResolver implements Resolve<any> {
  constructor(private awardService: AwardService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id;
    return forkJoin([
      this.awardService.countries,
      this.awardService.organizations,
      id ? this.awardService.getById(id) : of(null),
    ]);
  }
}
