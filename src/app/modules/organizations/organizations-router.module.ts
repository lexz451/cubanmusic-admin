import { OrganizationDetailResolver } from './organization-detail.resolver';
import { OrganizationsResolver } from './organizations.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { OrganizationListComponent } from '@app/modules/organizations/organization-list/organization-list.component';
import { OrganizationDetailsComponent } from '@app/modules/organizations/organization-details/organization-details.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    component: OrganizationListComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      data: OrganizationsResolver
    },
    data: { title: marker('Instituciones') }
  },
  {
    path: 'new',
    component: OrganizationDetailsComponent,
    resolve: {
      data: OrganizationDetailResolver
    },
    data: { title: marker('Crear Institución') }
  },
  {
    path: ':id',
    component: OrganizationDetailsComponent,
    resolve: {
      data: OrganizationDetailResolver
    },
    data: { title: marker('Editar Institución') },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class OrganizationsRoutingModule {}
