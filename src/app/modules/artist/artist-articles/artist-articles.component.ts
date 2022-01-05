import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '@app/@shared/models/article';
import { UiService } from '@shared/services/ui.service';
import { switchMap, finalize } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ArtistsService } from '@app/modules/artist/artist.service';
import { Artist } from '@app/@shared/models/artist';
import { TableAction } from '@shared/models/table-actions';
import { ActionsRendererComponent } from '@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { DatePipe } from '@angular/common';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@UntilDestroy()
@Component({
  selector: 'app-artist-articles',
  templateUrl: './artist-articles.component.html',
  styleUrls: ['./artist-articles.component.scss'],
})
export class ArtistArticlesComponent implements OnInit, OnChanges {
  @Input() artist: Artist;

  article = new Article();

  articles: Article[] = [];

  constructor(
    private datePipe: DatePipe,
    private modal: NgbModal,
    private artistService: ArtistsService,
    private uiService: UiService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.artist.id) {
      this.artistService
        .getArticles(this.artist.id)
        .pipe(untilDestroyed(this))
        .subscribe((res) => {
          this.articles = res;
        });
    }
  }

  addArticle(articleModal: any): void {
    this.article = new Article();
    this.modal
      .open(articleModal, {
        centered: true,
        size: 'md',
      })
      .result.then(
        () => {
          this.artistService
            .createArticle(this.artist.id, this.article)
            .pipe(
              untilDestroyed(this),
              switchMap(() => this.artistService.getArticles(this.artist.id))
            )
            .subscribe((res) => {
              this.articles = res;
              this.uiService.notifySuccess('Articulo creado con exito.');
            });
        },
        () => {}
      );
  }

  get articlesColumns(): ColDef[] {
    return [
      {
        field: 'title',
        headerName: 'Titulo',

        cellStyle: {
          lineHeight: '1.5',
          whiteSpace: 'break-spaces',
        },
      },
      {
        field: 'source',
        headerName: 'Medio',
      },
      {
        field: 'author',
        headerName: 'Autor',
      },
      {
        field: 'date',
        headerName: 'Fecha',
        cellRenderer: (params) => {
          return this.datePipe.transform(params.value, 'YYYY-MM-dd');
        },
      },
      {
        cellRendererFramework: ActionsRendererComponent,
        cellRendererParams: {
          useActions: (): TableAction[] => {
            return [TableAction.DELETE];
          },
          onAction: (type: TableAction, row: any) => {
            const articleID = row?.id;
            if (type == TableAction.DELETE) {
              if (articleID != null) {
                this.artistService
                  .deleteArticle(articleID)
                  .pipe(
                    untilDestroyed(this),
                    switchMap(() => this.artistService.getArticles(this.artist.id)),
                    finalize(() => this.uiService.notifySuccess('Articulo eliminado con exito.'))
                  )
                  .subscribe((res) => {
                    this.articles = res;
                  });
              }
            }
          },
        },
        width: 100,
      },
    ];
  }
}
