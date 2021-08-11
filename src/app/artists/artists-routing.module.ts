import { NgModule } from '@angular/core';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ArtistsComponent } from './artists.component';
import { Routes, RouterModule } from '@angular/router';
import { Shell } from './../shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([{ path: 'artists', component: ArtistsComponent, data: { title: marker('Artists') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ArtistsRoutingModule {}
