import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActionsRendererComponent } from '@app/@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { Article } from '@app/@shared/models/article';
import { Group } from '@app/@shared/models/group';
import { TableAction } from '@app/@shared/models/table-actions';
import { UiService } from '@app/@shared/services/ui.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ColDef } from 'ag-grid-community';
import { finalize, switchMap } from 'rxjs/operators';
import { GroupService } from '../group.service';

@UntilDestroy()
@Component({
  selector: 'app-group-articles',
  templateUrl: './group-articles.component.html',
  styleUrls: ['./group-articles.component.css']
})
export class GroupArticlesComponent implements OnInit, OnChanges {
  @Input() group: Group;

  article = new Article();

  articles: Article[] = [];

  constructor(
    private datePipe: DatePipe,
    private modal: NgbModal,
    private groupService: GroupService,
    private uiService: UiService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.group.id) {
      this.groupService
        .getArticles(this.group.id)
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
          this.groupService
            .createArticle(this.group.id, this.article)
            .pipe(
              untilDestroyed(this),
              switchMap(() => this.groupService.getArticles(this.group.id))
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
        headerName: 'Título',
        cellStyle: {
          lineHeight: '1.5',
          whiteSpace: 'break-spaces',
        },
        cellRenderer: params => {
          return `<a class="fw-bold" href="${params.data?.url}">${params.value}</a>`
        }
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
                this.groupService
                  .deleteArticle(articleID)
                  .pipe(
                    untilDestroyed(this),
                    switchMap(() => this.groupService.getArticles(this.group.id)),
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
