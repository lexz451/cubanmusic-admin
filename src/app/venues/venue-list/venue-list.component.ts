import { DatePipe } from '@angular/common';
import { UiService } from './../../@shared/services/ui.service';
import { finalize } from 'rxjs/operators';
import { VenueService } from './../venue.service';
import { Venue } from './../../@shared/models/venue';
import { ColDef } from 'ag-grid-community';
import { Logger } from './../../@shared/logger.service';
import { TableAction } from './../../@shared/models/table-actions';
import { ActionsRendererComponent } from './../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';

const log = new Logger('Venues');

@UntilDestroy()
@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss'],
})
export class VenueListComponent implements OnInit {
  venues: Venue[] = [];

  constructor(
    private router: Router,
    private venueService: VenueService,
    private uiService: UiService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.uiService.showLoading();
    this.venueService
      .getAll()
      .pipe(
        untilDestroyed(this),
        finalize(() => this.uiService.hideLoading())
      )
      .subscribe((res) => {
        this.venues = res || [];
      });
  }

  get columns(): ColDef[] {
    return [
      {
        field: 'name',
        headerName: 'Nombre',
      },
      {
        field: 'venueType',
        headerName: 'Tipo',
      },
      {
        field: 'foundedAt',
        headerName: 'Fundado en',
        cellRenderer: (params) => {
          return this.datePipe.transform(params.value, 'YYYY-MM-dd');
        },
      },
      {
        field: 'capacity',
        headerName: 'Capacidad',
      },
      {
        field: 'openingHours',
        headerName: 'Horario de Servicios',
      },
      {
        field: 'phone',
        headerName: 'Teléfono',
        cellRenderer: (params) => {
          const phone = params.value;
          return `(${phone.code}) ${phone.number}`;
        },
      },
      {
        field: 'email',
        headerName: 'Email',
      },
      {
        field: 'website',
        headerName: 'Sitio web',
      },
      {
        field: 'address',
        headerName: 'Dirección',
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
                this.router.navigate(['venues', id]);
              } else {
                log.error('Row id not found!...');
              }
            }
          },
        },
      },
    ];
  }

  addVenues(): void {
    this.router.navigate(['venues', 'new']);
  }
}
