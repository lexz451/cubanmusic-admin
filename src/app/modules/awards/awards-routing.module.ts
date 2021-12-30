import { AwardDetailsComponent } from './award-details/award-details.component';
import { AwardListComponent } from './award-list/award-list.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AwardListResolver } from './award-list.resolver';
import { AwardDetailsResolver } from './award-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: AwardListComponent,
    resolve: {
      data: AwardListResolver
    },
    data: {
      title: marker('Grupos'),
    },
  },
  {
    path: 'new',
    component: AwardDetailsComponent,
    resolve: {
      data: AwardDetailsResolver
    },
    data: {
      title: marker('Crear Grupo')
    },
  },
  {
    path: ':id',
    component: AwardDetailsComponent,
    resolve: {
      data: AwardDetailsResolver
    },
    data: {
      title: marker('Editar Grupo')
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AwardsRoutingModule {}
