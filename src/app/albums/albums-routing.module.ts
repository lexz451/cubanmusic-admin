import { AlbumDetailsComponent } from './album-details/album-details.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '', component: AlbumListComponent, data: { title: marker('Albums') },
  },
  {
    path: 'new', component: AlbumDetailsComponent,  data: { title: marker('Crear Album') }
  },
  {
    path: ':id', component: AlbumDetailsComponent, data: { title: marker('Editar Album') }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AlbumsRoutingModule {

}
