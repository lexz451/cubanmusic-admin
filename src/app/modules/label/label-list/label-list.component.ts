import { concatMap } from 'rxjs/operators';
import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { Logger } from '../../../@shared/logger.service';
import { TableAction } from '../../../@shared/models/table-actions';
import { ActionsRendererComponent } from '../../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Recordlabel } from '../../../@shared/models/recordlabel';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { LabelService } from '../label.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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

  constructor(private labelService: LabelService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const { data } = this.route.snapshot.data;
    this.countries = data[0] || [];
    this.labels = data[1] || [];
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
        field: 'email',
        headerName: 'Email',
        cellRenderer: (params) => {
          return params.value || '-';
        },
      },
      {
        field: 'countryId',
        headerName: 'País',
        cellRenderer: (params) => {
          const countryId = params?.value;
          const country = this.countries.find((e) => e.id == countryId);
          if (!country) return '-';
          return country.name;
        },
      },
      {
        field: 'website',
        headerName: 'Sitio web',
        cellRenderer: (params) => {
          return params.value ? `<a href="${params.value}">${params.value}</a>` : '-';
        },
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
            if (type == TableAction.DELETE) {
              const id = row?.id;
              id &&
                this.labelService
                  .delete(id)
                  .pipe(
                    untilDestroyed(this),
                    concatMap(() => this.labelService.getAll())
                  )
                  .subscribe((res) => {
                    this.labels = res || [];
                  });
            }
          },
        },
      },
    ];
  }
}
