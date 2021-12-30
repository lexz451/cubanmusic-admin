import { OrganizationService } from './organization.service';
import { forkJoin } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class OrganizationsResolver implements Resolve<any> {
  constructor(
    private organizationService: OrganizationService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return forkJoin([
      this.organizationService.countries,
      this.organizationService.getAll()
    ]);
  }
}
