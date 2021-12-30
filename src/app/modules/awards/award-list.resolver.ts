import { Award } from '@app/@shared/models/award';
import { Organization } from '@app/@shared/models/organization';
import { Country } from '@app/@shared/models/country';
import { AwardService } from './award.service';
import { forkJoin, Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AwardListResolver implements Resolve<any> {
  constructor(private awardService: AwardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return forkJoin([
      this.awardService.countries,
      this.awardService.organizations,
      this.awardService.getAll()
    ]);
  }

}
