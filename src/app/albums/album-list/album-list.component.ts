import { SelectorService } from '@app/@shared/services/selector.service';
import { ISelectableItem } from './../../@shared/models/selectable-item';
import { DatePipe } from '@angular/common';
import { Logger } from './../../@shared/logger.service';
import { Router } from '@angular/router';
import { TableAction } from './../../@shared/models/table-actions';
import { ActionsRendererComponent } from './../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { finalize } from 'rxjs/operators';
import { UiService } from './../../@shared/services/ui.service';
import { AlbumsService } from './../albums.service';
import { ListRendererComponent } from './../../@shared/components/table/renderers/list-renderer/list-renderer.component';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { Album } from '@app/@shared/models/albums';
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
    private selectorService: SelectorService,
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
        headerName: 'Titulo',
      },
      {
        field: 'releasedOn',
        headerName: 'Lanzado en',
        cellRenderer: (params) => {
          return this.datePipe.transform(params.value, 'YYYY-MM-dd');
        },
      },
      {
        field: 'recordLabel',
        headerName: 'Sello Discografico',
        cellRenderer: (params) => {
          const labelId = params.value;
          const recordLabel = this.recordLabels.find((e) => e.id == labelId);
          return recordLabel?.name || '-';
        },
      },
      {
        field: 'artists',
        headerName: 'Artistas',
        cellRenderer: (params) => {
          const artistIds = params.value;
          const artists = this.artists.filter((e) => artistIds.includes(e.id));
          return artists.map((e) => `${e.name}`).toString();
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
