import { DataService } from '@app/@shared/services/data.service';
import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { DatePipe } from '@angular/common';
import { Logger } from '../../../@shared/logger.service';
import { Router } from '@angular/router';
import { TableAction } from '../../../@shared/models/table-actions';
import { ActionsRendererComponent } from '../../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { finalize, map } from 'rxjs/operators';
import { UiService } from '../../../@shared/services/ui.service';
import { AlbumsService } from '../albums.service';
import { ListRendererComponent } from '../../../@shared/components/table/renderers/list-renderer/list-renderer.component';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { Album } from '@app/@shared/models/album';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { forkJoin } from 'rxjs';

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
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.fectchData();
  }

  private fectchData(): void {
    forkJoin([this.selectorService.artists, this.selectorService.recordLabels, this.albumService.getAll()])
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.artists = res[0] || [];
        this.recordLabels = res[1] || [];
        this.albums = res[2] || [];
      });
  }

  get columns(): ColDef[] {
    return [
      {
        field: 'title',
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
                    this.uiService.notifySuccess('Album eliminado con exito.');
                    this.fectchData();
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
