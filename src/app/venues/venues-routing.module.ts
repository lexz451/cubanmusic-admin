import { VenueDetailsComponent } from './venue-details/venue-details.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: VenueListComponent,
    data: { title: marker('Venues'), animation: 13 },
  },
  {
    path: 'new',
    component: VenueDetailsComponent,
    data: { title: marker('Crear Venue'), animation: 14 },
  },
  {
    path: ':id',
    component: VenueDetailsComponent,
    data: { title: marker('Editar Venue'), animation: 15 },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenuesRoutingModule {}
