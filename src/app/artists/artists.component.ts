import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { TableAction } from './../@core/enum/table-action.enum';
import { ActionsRendererComponent } from './../@shared/table/renderers/actions-renderer/actions-renderer.component';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@app/@core';
import { Location } from '@app/@core/model/location';

@UntilDestroy()
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
  data: any[] = [
    {
      name: 'Some artist name',
      birthDate: new Date(),
      deathDate: new Date(),
      birthPlace: new Location(),
      deathPlace: new Location(),
      residencePlace: null,
      gender: 'Male',
      jobTitle: 'Drummer',
      jobRoles: ['Role', 'Role', 'Role'],
    },
  ];

  columns: ColDef[] = [
    {
      field: 'name',
      width: 100,
      sortable: true,
      headerName: 'Nombre',
    },
    {
      field: 'birthDate',
      headerName: 'Fecha de Nacimiento',
    },
    {
      field: 'deathDate',
      headerName: 'Fecha de Muerte',
    },
    {
      field: 'birthPlace',
      width: 150,
      headerName: 'Lugar de Nacimiento',
    },
    {
      field: 'deathPlace',
      width: 150,
      headerName: 'Lugar de Muerte',
    },
    {
      field: 'residencePlace',
      width: 100,
      headerName: 'Residencia',
    },
    {
      field: 'gender',
      width: 50,
      headerName: 'Género',
    },
    {
      field: 'jobTitle',
      width: 50,
      headerName: 'Ocupación',
    },
    {
      field: 'jobRoles',
      width: 100,
      headerName: 'Roles',
    },
    {
      cellRendererFramework: ActionsRendererComponent,
      cellRendererParams: {
        useActions: (): TableAction[] => {
          return [TableAction.EDIT, TableAction.DELETE, TableAction.VIEW];
        },
        onAction: (type: TableAction, row: any) => {
          if (type == TableAction.VIEW) {
            const ref = this._modalService.open(ArtistDetailsComponent, {
              centered: true,
              size: 'xl',
            });
            ref.componentInstance.editable = true;
            ref.componentInstance.artist = row;
            ref.closed.pipe(untilDestroyed(this)).subscribe((res) => {
              console.log('Closed modal');
            });
          }
        },
      },
      width: 100,
    },
  ];

  constructor(private _modalService: NgbModal) {}

  ngOnInit() {}
}
