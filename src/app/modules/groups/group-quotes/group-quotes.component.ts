import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ActionsRendererComponent } from '@app/@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { Group } from '@app/@shared/models/group';
import { Quote } from '@app/@shared/models/quote';
import { TableAction } from '@app/@shared/models/table-actions';
import { UiService } from '@app/@shared/services/ui.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ColDef } from 'ag-grid-community';
import { finalize, switchMap } from 'rxjs/operators';
import { GroupService } from '../group.service';

@UntilDestroy()
@Component({
  selector: 'app-group-quotes',
  templateUrl: './group-quotes.component.html',
  styleUrls: ['./group-quotes.component.css'],
})
export class GroupQuotesComponent implements OnInit, OnChanges {
  @Input() group: Group;

  quote = new Quote();

  quotes: Quote[] = [];

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
        .getQuotes(this.group.id)
        .pipe(untilDestroyed(this))
        .subscribe((res) => {
          this.quotes = res;
        });
    }
  }

  addQuote(quoteModal: any): void {
    this.quote = new Quote();
    this.modal
      .open(quoteModal, {
        centered: true,
        size: 'md',
      })
      .result.then(
        () => {
          this.groupService
            .createQuote(this.group.id, this.quote)
            .pipe(
              untilDestroyed(this),
              switchMap(() => this.groupService.getQuotes(this.group.id))
            )
            .subscribe((res) => {
              this.quotes = res;
              this.uiService.notifySuccess('Quote agregado con éxito.');
            });
        },
        () => {}
      );
  }

  get quotesColumns(): ColDef[] {
    return [
      {
        field: 'quote',
        headerName: 'Comentario',
        width: 450,
        wrapText: true,
        autoHeight: true,
        cellStyle: {
          fontStyle: 'italic',
          lineHeight: '1.5',
        },
      },
      {
        field: 'author',
        headerName: 'Autor',
      },
      {
        field: 'source',
        headerName: 'Fuente',
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
            const quoteID = row?.id;
            if (type == TableAction.DELETE) {
              if (quoteID != null) {
                this.groupService
                  .deleteQuote(quoteID)
                  .pipe(
                    untilDestroyed(this),
                    switchMap(() => this.groupService.getQuotes(this.group.id)),
                    finalize(() => this.uiService.notifySuccess('Quote eliminado con exito.'))
                  )
                  .subscribe((res) => {
                    this.quotes = res;
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
