import { ListRendererComponent } from './../../../@shared/components/table/renderers/list-renderer/list-renderer.component';
import { concatMap } from 'rxjs/operators';
import { DataService } from '@app/@shared/services/data.service';
import { forkJoin } from 'rxjs';
import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { Logger } from '../../../@shared/logger.service';
import { TableAction } from '../../../@shared/models/table-actions';
import { ActionsRendererComponent } from '../../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { ColDef } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { UiService } from '@shared/services/ui.service';
import { ArtistsService } from '../artist.service';
import { Artist } from '../../../@shared/models/artist';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const log = new Logger('Artists');

@UntilDestroy()
@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];
  jobTitles: ISelectableItem[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artistsService: ArtistsService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    const { data } = this.route.snapshot.data;
    this.jobTitles = data[0] || [];
    this.artists = data[1] || [];
  }

  addArtist(): void {
    this.router.navigate(['artists', 'new']);
  }

  get columns(): ColDef[] {
    return [
      {
        width: 150,
        field: 'name',
        sortable: true,
        sort: 'desc',
        headerName: 'Nombre',
        wrapText: true,
        cellStyle: {
          lineHeight: '1',
          textAlign: 'center',
          fontWeight: 'bold',
        }
      },
      {
        width: 100,
        field: 'isniCode',
        sortable: false,
        headerName: 'ISNI',
        cellRenderer: (params) => {
          if (!params.value) return '-';
          return `<a href="https://isni.org/isni/${params.value.trim().replace(/ /g, '')}">${params.value}</a>`;
        },
      },
      {
        field: 'additionalNames',
        headerName: 'Nombres Adicionales',
        cellRendererFramework: ListRendererComponent,
      },
      {
        field: 'jobTitleId',
        width: 50,
        headerName: 'Ocupación',
        cellRenderer: (params) => {
          return this.jobTitles?.find((e) => e.id == params.value)?.name || '-';
        },
      },
      /*{
        width: 150,
        field: 'birthDate',
        headerName: 'Fecha de Nacimiento',
        cellRenderer: (params) => {
          return this._datePipe.transform(params.value, 'YYYY-MM-dd') || '-';
        },
      },
      {
        width: 150,
        field: 'deathDate',
        headerName: 'Fecha de Muerte',
        cellRenderer: (params) => {
          return this._datePipe.transform(params.value, 'YYYY-MM-dd') || '-';
        },
      },
      {
        field: 'birthPlace',
        width: 200,
        headerName: 'Lugar de Nacimiento',
        cellRenderer: (params) => {
          if (!params.value) return '-';
          const location = this.locations?.find((e) => e.id == params.value);
          return location.name;
        },
      },
      {
        field: 'deathPlace',
        width: 200,
        headerName: 'Lugar de Fallecimiento',
        cellRenderer: (params) => {
          if (!params.value) return '-';
          const location = this.locations?.find((e) => e.id == params.value);
          return location.name;
        },
      },
      {
        field: 'residencePlace',
        width: 200,
        headerName: 'Lugar de Residencia',
        cellRenderer: (params) => {
          if (!params.value) return '-';
          const location = this.locations?.find((e) => e.id == params.value);
          return location.name;
        },
      },
      {
        field: 'jobTitle',
        width: 50,
        headerName: 'Ocupación',
        cellRenderer: (params) => {
          return params?.value?.title || '-';
        },
      },*/
      {
        cellRendererFramework: ActionsRendererComponent,
        cellRendererParams: {
          useActions: (): TableAction[] => {
            return [TableAction.EDIT, TableAction.DELETE];
          },
          onAction: (type: TableAction, row: any) => {
            const id = row?.id;
            if (type == TableAction.EDIT) {
              id && this.router.navigate(['artists', id]);
            }
            if (type == TableAction.DELETE) {
              id &&
                this.artistsService
                  .delete(id)
                  .pipe(
                    untilDestroyed(this),
                    concatMap(() => this.artistsService.getAll())
                  )
                  .subscribe((res) => {
                    this.artists = res || [];
                    this.uiService.notifySuccess('Artista eliminado con exito.');
                  });
            }
          },
        },
        width: 50,
      },
    ];
  }
}
