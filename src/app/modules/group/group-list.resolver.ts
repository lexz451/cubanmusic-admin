import { forkJoin } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root',
})
export class GroupListResolver implements Resolve<any> {
  constructor(private groupService: GroupService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return forkJoin([this.groupService.getAll()]);
  }
}
