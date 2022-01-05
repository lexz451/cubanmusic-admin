import { LabelDetailsComponent } from './label-details/label-details.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { LabelListComponent } from './label-list/label-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabelListResolver } from './label-list.resolver';
import { LabelDetailResolver } from './label-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: LabelListComponent,
    resolve: {
      data: LabelListResolver,
    },
    data: { title: marker('Sellos Discográficos'), animation: 16 },
  },
  {
    path: 'new',
    component: LabelDetailsComponent,
    resolve: {
      data: LabelDetailResolver,
    },
    data: { title: marker('Crear Sello Discográfico'), animation: 17 },
  },
  {
    path: ':id',
    component: LabelDetailsComponent,
    resolve: {
      data: LabelDetailResolver,
    },
    data: { title: marker('Editar Sello Discográfico'), animation: 18 },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class LabelsRoutingModule {}
