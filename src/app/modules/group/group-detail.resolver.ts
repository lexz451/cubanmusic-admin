import { forkJoin, of } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root',
})
export class GroupDetailResolver implements Resolve<any> {
  constructor(private groupService: GroupService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params.id;
    return forkJoin([
      this.groupService.albums$,
      this.groupService.awards$,
      this.groupService.genres$,
      this.groupService.recordLabels$,
      this.groupService.artists$,
      this.groupService.organizations$,
      id ? this.groupService.getById(id) : of(null),
    ]);
  }
}
