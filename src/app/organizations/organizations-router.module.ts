import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { OrganizationListComponent } from '@app/organizations/organization-list/organization-list.component';
import { OrganizationDetailsComponent } from '@app/organizations/organization-details/organization-details.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: OrganizationListComponent, data: { title: marker('Instituciones') } },
  { path: 'new', component: OrganizationDetailsComponent, data: { title: marker('Crear Institución') } },
  { path: ':id', component: OrganizationDetailsComponent, data: { title: marker('Editar Institución') } },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class OrganizationsRoutingModule {}
