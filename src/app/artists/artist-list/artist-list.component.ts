import { Logger } from './../../@shared/logger.service';
import { TableAction } from './../../@shared/models/table-actions';
import { ActionsRendererComponent } from './../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { ListRendererComponent } from './../../@shared/components/table/renderers/list-renderer/list-renderer.component';
import { ColDef } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { UiService } from '@shared/services/ui.service';
import { ArtistsService } from './../artists.service';
import { Artist } from './../../@shared/models/artist';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';

const log = new Logger('Artists');

@UntilDestroy()
@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];

  constructor(
    private router: Router,
    private artistsService: ArtistsService,
    private uiService: UiService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.artistsService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.artists = res || [];
      });
  }

  addArtist(): void {
    this.router.navigate(['artists', 'new']);
  }

  get columns(): ColDef[] {
    return [
      {
        field: 'name',
        sortable: true,
        headerName: 'Nombre',
      },
      {
        field: 'birthDate',
        headerName: 'Fecha de Nacimiento',
        cellRenderer: (params) => {
          return this.datePipe.transform(params.value, 'YYYY-MM-dd');
        },
      },
      {
        field: 'deathDate',
        headerName: 'Fecha de Muerte',
        cellRenderer: (params) => {
          return this.datePipe.transform(params.value, 'YYYY-MM-dd');
        },
      },
      {
        field: 'birthPlace',
        width: 150,
        headerName: 'Lugar de Nacimiento',
        cellRenderer: (params) => {
          return `${params.value?.city || '-'} / ${params.value?.state || '-'} / ${params.value?.country?.name || '-'}`;
        },
      },
      {
        field: 'deathPlace',
        width: 150,
        headerName: 'Lugar de Muerte',
        cellRenderer: (params) => {
          return `${params.value?.city || '-'} / ${params.value?.state || '-'} / ${params.value?.country?.name || '-'}`;
        },
      },
      {
        field: 'residencePlace',
        width: 100,
        headerName: 'Residencia',
        cellRenderer: (params) => {
          return `${params.value?.city || '-'} / ${params.value?.state || '-'} / ${params.value?.country?.name || '-'}`;
        },
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
        cellRenderer: (params) => {
          return params?.value?.title || '-';
        },
      },
      {
        field: 'jobRoles',
        width: 100,
        headerName: 'Roles',
        cellRendererFramework: ListRendererComponent,
        cellRendererParams: {},
      },
      {
        cellRendererFramework: ActionsRendererComponent,
        cellRendererParams: {
          useActions: (): TableAction[] => {
            return [TableAction.EDIT, TableAction.DELETE];
          },
          onAction: (type: TableAction, row: any) => {
            if (type == TableAction.EDIT) {
              const id = row?.id;
              if (id) {
                this.router.navigate(['artists', id]);
              } else {
                log.error('Row id not found!...');
              }
            }
          },
        },
        width: 100,
      },
    ];
  }
}
