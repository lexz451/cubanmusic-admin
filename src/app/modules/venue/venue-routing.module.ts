import { VenueDetailsComponent } from './venue-details/venue-details.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VenueListResolver } from './venue-list.resolver';
import { VenueDetailResolver } from './venue-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: VenueListComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      data: VenueListResolver,
    },
    data: { title: marker('Venues') },
  },
  {
    path: 'new',
    component: VenueDetailsComponent,
    resolve: {
      data: VenueDetailResolver,
    },
    data: { title: marker('Crear Venue') },
  },
  {
    path: ':id',
    component: VenueDetailsComponent,
    resolve: {
      data: VenueDetailResolver,
    },
    data: { title: marker('Editar Venue') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenuesRoutingModule {}
