import { GroupDetailResolver } from './group-detail.resolver';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { NgModule } from '@angular/core';
import { GroupListComponent } from '@app/modules/group/group-list/group-list.component';
import { GroupDetailsComponent } from '@app/modules/group/group-details/group-details.component';
import { GroupListResolver } from './group-list.resolver';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    component: GroupListComponent,
    resolve: {
      data: GroupListResolver,
    },
    data: { title: marker('Groups') },
  },
  {
    path: 'new',
    component: GroupDetailsComponent,
    resolve: {
      data: GroupDetailResolver,
    },
    data: { title: marker('Groups') },
  },
  {
    path: ':id',
    component: GroupDetailsComponent,
    resolve: {
      data: GroupDetailResolver,
    },
    data: { title: marker('Groups') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class GroupsRoutingModule {}
