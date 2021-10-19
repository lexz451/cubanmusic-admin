import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { forkJoin } from 'rxjs';
import { DataService } from '../../../@shared/services/data.service';
import { Country } from '../../../@shared/models/country';
import { Logger } from '../../../@shared/logger.service';
import { TableAction } from '../../../@shared/models/table-actions';
import { ActionsRendererComponent } from '../../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { Router } from '@angular/router';
import { Recordlabel } from '../../../@shared/models/recordlabel';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { LabelService } from '../label.service';

const log = new Logger('Labels');

@UntilDestroy()
@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./label-list.component.scss'],
})
export class LabelListComponent implements OnInit {
  labels: Recordlabel[] = [];
  countries: ISelectableItem[] = [];

  constructor(private labelService: LabelService, private selectorService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    forkJoin([this.selectorService.countries, this.labelService.getAll()])
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.countries = res[0] || [];
        this.labels = res[1] || [];
      });
  }

  addLabel(): void {
    this.router.navigate(['labels', 'new']);
  }

  get columns(): ColDef[] {
    return [
      {
        field: 'ipiCode',
        headerName: 'IPI',
      },
      {
        field: 'isniCode',
        headerName: 'ISNI',
      },
      {
        field: 'name',
        headerName: 'Nombre',
      },
      {
        field: 'phone',
        headerName: 'Teléfono',
        cellRenderer: (params) => {
          const phone = params.value;
          return `(${phone.code || "-"}) ${phone.number || "-"}`;
        },
      },
      {
        field: 'email',
        headerName: 'Email',
        cellRenderer: params => {
          return params.value || "-";
        }
      },
      {
        field: 'country',
        headerName: 'País',
        cellRenderer: (params) => {
          const countryId = params?.value;
          const country = this.countries.find((e) => e.id == countryId);
          if (!country) return '-';
          return `${country?.icon} ${country?.name}`;
        },
      },
      {
        field: 'website',
        headerName: 'Sitio web',
        cellRenderer: params => {
          return params.value || "-";
        }
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
                this.router.navigate(['labels', id]);
              } else {
                log.error('Row id not found!...');
              }
            }
          },
        },
      },
    ];
  }
}
