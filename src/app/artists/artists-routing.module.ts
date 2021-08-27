import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { ArtistsComponent } from './artists.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: ArtistsComponent, data: { title: marker('Artists') } },
  { path: 'new', component: ArtistDetailsComponent, data: { title: marker('Artist') } },
  { path: ':id', component: ArtistDetailsComponent, data: { title: marker('Artist') } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ArtistsRoutingModule {}
