import { DataService } from '@app/@shared/services/data.service';
import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { DatePipe } from '@angular/common';
import { Logger } from '../../../@shared/logger.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TableAction } from '../../../@shared/models/table-actions';
import { ActionsRendererComponent } from '../../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { UiService } from '../../../@shared/services/ui.service';
import { AlbumsService } from '../albums.service';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { Album } from '@app/@shared/models/album';
import { forkJoin } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const log = new Logger('Albums');

@UntilDestroy()
@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss'],
})
export class AlbumListComponent implements OnInit {
  albums: Album[] = [];
  recordLabels: ISelectableItem[] = [];
  artists: ISelectableItem[] = [];

  constructor(
    private albumService: AlbumsService,
    private selectorService: DataService,
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    const { data } = this.route.snapshot.data;
    this.artists = data[0] || [];
    this.recordLabels = data[1] || [];
    this.albums = data[2] || [];
  }

  get columns(): ColDef[] {
    return [
      {
        field: 'name',
        headerName: 'Título',
        width: 300,
        wrapText: true,
        cellStyle: {
          'line-height': '1',
          'word-break': 'break-word',
          'text-align': 'center',
        },
      },
      {
        field: 'releasedDate',
        headerName: 'Fecha de Lanzamiento',
        cellRenderer: (params) => {
          return params.value ? this.datePipe.transform(params.value, 'YYYY-MM-dd') : '-';
        },
      },
      {
        field: 'recordLabel',
        headerName: 'Sello Discográfico',
        cellRenderer: (params) => {
          const labelId = params.value;
          const recordLabel = this.recordLabels.find((e) => e.id == labelId);
          return recordLabel?.name || '-';
        },
      },
      {
        field: 'artists',
        headerName: 'Artistas',
        width: 300,
        autoHeight: true,

        cellRenderer: (params) => {
          const artistIds: number[] = params.value;
          if (!artistIds || artistIds.length == 0) {
            return '-';
          }
          const artists = this.artists.filter((e) => artistIds?.includes(e.id));
          const names = artists.map((e) => `${e.name}`);
          return `<div class="d-flex flex-column">
                    ${names.map((e) => `<span>${e}</span>`).join('')}
                  </div>`;
        },
      },
      {
        cellRendererFramework: ActionsRendererComponent,
        cellRendererParams: {
          useActions: (): TableAction[] => {
            return [TableAction.EDIT, TableAction.DELETE];
          },
          onAction: (type: TableAction, row: any) => {
            const id = row?.id;
            if (type == TableAction.EDIT) {
              id && this.router.navigate(['albums', id]);
            }
            if (type == TableAction.DELETE) {
              id &&
                this.albumService
                  .delete(id)
                  .pipe(untilDestroyed(this))
                  .subscribe(() => {
                    this.router
                      .navigate([], {
                        relativeTo: this.route,
                      })
                      .then(() => this.uiService.notifySuccess('Album eliminado con éxito.'));
                  });
            }
          },
        },
        width: 100,
      },
    ];
  }

  addAlbum(): void {
    this.router.navigate(['albums', 'new']);
  }
}
