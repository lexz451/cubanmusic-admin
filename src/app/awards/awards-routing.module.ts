import {
  AwardDetailsComponent
} from './award-details/award-details.component';
import {
  AwardListComponent
} from './award-list/award-list.component';
import {
  marker
} from '@biesbjerg/ngx-translate-extract-marker';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  NgModule
} from "@angular/core";

const routes: Routes = [{
  path: '',
  component: AwardListComponent,
  data: {
    title: marker('Grupos')
  }
},
{
  path: 'new',
  component: AwardDetailsComponent,
  data: {
    title: marker('Crear Grupo')
  }
},
{
  path: ':id',
  component: AwardDetailsComponent,
  data: {
    title: marker('Editar Grupo')
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AwardsRoutingModule { }
