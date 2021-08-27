import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { NgModule } from '@angular/core';
import { GroupListComponent } from '@app/groups/group-list/group-list.component';
import { GroupDetailsComponent } from '@app/groups/group-details/group-details.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: GroupListComponent, data: { title: marker('Groups') } },
  { path: 'new', component: GroupDetailsComponent, data: { title: marker('Groups') } },
  { path: ':id', component: GroupDetailsComponent, data: { title: marker('Groups') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class GroupsRoutingModule {}
