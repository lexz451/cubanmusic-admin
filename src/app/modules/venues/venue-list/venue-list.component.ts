import { DatePipe } from '@angular/common';
import { UiService } from '../../../@shared/services/ui.service';
import { VenueService } from '../venue.service';
import { Venue } from '../../../@shared/models/venue';
import { ColDef } from 'ag-grid-community';
import { Logger } from '../../../@shared/logger.service';
import { TableAction } from '../../../@shared/models/table-actions';
import { ActionsRendererComponent } from '../../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/@shared/services/data.service';
import { forkJoin } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const log = new Logger('Venues');

@UntilDestroy()
@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.scss'],
})
export class VenueListComponent implements OnInit {
  venues: Venue[] = [];

  venueTypes: any[] = [];

  constructor(
    private router: Router,
    private venueService: VenueService,
    private dataService: DataService,
    private uiService: UiService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData(): void {
    forkJoin([this.venueService.getAll(), this.dataService.venueTypes])
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.venues = res[0] || [];
        this.venueTypes = res[1] || [];
      });
  }

  get columns(): ColDef[] {
    return [
      {
        field: 'name',
        headerName: 'Nombre',
        width: 300,
      },
      {
        field: 'venueType',
        headerName: 'Tipo',
        cellRenderer: (params) => {
          return this.venueTypes.find((v) => v.id == params.value)?.name || '-';
        },
        width: 50,
      },
      {
        field: 'foundedAt',
        headerName: 'Fundado en',
        cellRenderer: (params) => {
          return params.value ? this.datePipe.transform(params.value, 'YYYY-MM-dd') : '-';
        },
      },
      {
        field: 'capacity',
        headerName: 'Capacidad',
        width: 50,
        cellRenderer: (params) => params.value || '-',
      },
      /*{
        field: 'openingHours',
        headerName: 'Horario de Servicios',
      },*/
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
        width: 250,
        cellRenderer: (params) => params.value || '-',
      },
      {
        field: 'website',
        headerName: 'Sitio web',
        width: 250,
        cellRenderer: (params) => params.value || '-',
      },
      /*{
        field: 'address',
        headerName: 'Dirección',
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
              id && this.router.navigate(['venues', id]);
            }
            if (type == TableAction.DELETE) {
              id &&
                this.venueService
                  .delete(id)
                  .pipe(untilDestroyed(this))
                  .subscribe(() => {
                    this.fetchData();
                    this.uiService.notifySuccess('Venue eliminado con exito');
                  });
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
