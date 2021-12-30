import { OrganizationService } from './organization.service';
import { forkJoin, of } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class OrganizationDetailResolver implements Resolve<any> {
  constructor(
    private organizationService: OrganizationService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id;
    return forkJoin([
      this.organizationService.countries,
      id ? this.organizationService.getById(id) : of(null)
    ]);
  }
}
