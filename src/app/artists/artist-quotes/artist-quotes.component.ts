import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Quote } from '@app/@shared/models/quote';
import { switchMap, finalize } from 'rxjs/operators';
import { Artist } from '@app/@shared/models/artist';
import { TableAction } from '@shared/models/table-actions';
import { ActionsRendererComponent } from '@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { UiService } from '@shared/services/ui.service';
import { ArtistsService } from '@app/artists/artists.service';
import { DatePipe } from '@angular/common';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';

@UntilDestroy()
@Component({
  selector: 'app-artist-quotes',
  templateUrl: './artist-quotes.component.html',
  styleUrls: ['./artist-quotes.component.scss'],
})
export class ArtistQuotesComponent implements OnInit, OnChanges {
  @Input() artist: Artist;

  quote = new Quote();

  quotes: Quote[] = [];

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
        .getQuotes(this.artist.id)
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
          this.artistService
            .createQuote(this.artist.id, this.quote)
            .pipe(
              untilDestroyed(this),
              switchMap(() => this.artistService.getQuotes(this.artist.id))
            )
            .subscribe((res) => {
              this.quotes = res;
              this.uiService.notifySuccess('Quote agregado con exito.');
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
                this.artistService
                  .deleteQuote(quoteID)
                  .pipe(
                    untilDestroyed(this),
                    switchMap(() => this.artistService.getQuotes(this.artist.id)),
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
