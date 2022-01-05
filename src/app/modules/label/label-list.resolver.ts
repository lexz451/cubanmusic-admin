import { LabelService } from './label.service';
import { forkJoin } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LabelListResolver implements Resolve<any> {
  constructor(private labelService: LabelService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return forkJoin([this.labelService.countries, this.labelService.getAll()]);
  }
}
