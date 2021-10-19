import { LabelDetailsComponent } from './label-details/label-details.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { LabelListComponent } from './label-list/label-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LabelListComponent,
    data: { title: marker('Sellos Discogrficos'), animation: 16 },
  },
  {
    path: 'new',
    component: LabelDetailsComponent,
    data: { title: marker('Crear Sello Discografico'), animation: 17 },
  },
  {
    path: ':id',
    component: LabelDetailsComponent,
    data: { title: marker('Editar Sello Discografico'), animation: 18 },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class LabelsRoutingModule {}