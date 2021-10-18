import { ArtistListComponent } from './artist-list/artist-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: ArtistListComponent, data: { title: marker('Artistas'), animation: 1 } },
  { path: 'new', component: ArtistDetailsComponent, data: { title: marker('Crear Artista'), animation: 2 } },
  { path: ':id', component: ArtistDetailsComponent, data: { title: marker('Editar Artista'), animation: 3 } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ArtistsRoutingModule {}
