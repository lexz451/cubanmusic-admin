import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { TableAction } from './../@core/enum/table-action.enum';
import { ActionsRendererComponent } from './../@shared/table/renderers/actions-renderer/actions-renderer.component';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@app/@core';

@UntilDestroy()
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
  data: any[] = [
    {
      name: 'x',
      birthDate: new Date(),
      deathDate: new Date(),
      birthPlace: null,
      deathPlace: null,
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
    },
    {
      field: 'birthDate',
    },
    {
      field: 'deathDate',
    },
    {
      field: 'birthPlace',
      width: 100,
    },
    {
      field: 'deathPlace',
      width: 100,
    },
    {
      field: 'residencePlace',
      width: 100,
    },
    {
      field: 'gender',
      width: 50,
    },
    {
      field: 'jobTitle',
      width: 50,
    },
    {
      field: 'jobRoles',
      width: 100,
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
