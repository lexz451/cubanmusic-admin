import { AlbumDetailResolver } from './album-detail.resolver';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AlbumListResolver } from './album-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: AlbumListComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      data: AlbumListResolver,
    },
    data: { title: marker('Albums') },
  },
  {
    path: 'new',
    component: AlbumDetailsComponent,
    resolve: {
      data: AlbumDetailResolver,
    },
    data: { title: marker('Crear Album') },
  },
  {
    path: ':id',
    component: AlbumDetailsComponent,
    resolve: {
      data: AlbumDetailResolver,
    },
    data: { title: marker('Editar Album') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AlbumsRoutingModule {}
