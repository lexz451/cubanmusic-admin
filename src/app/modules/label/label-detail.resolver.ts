import { forkJoin, of } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LabelService } from './label.service';

@Injectable({
  providedIn: 'root',
})
export class LabelDetailResolver implements Resolve<any> {
  constructor(private labelService: LabelService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id;
    return forkJoin([this.labelService.countries, id ? this.labelService.getById(id) : of(null)]);
  }
}
