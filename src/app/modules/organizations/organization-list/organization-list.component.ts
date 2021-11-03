import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { DataService } from '../../../@shared/services/data.service';
import { UiService } from '../../../@shared/services/ui.service';
import { Logger } from '../../../@shared/logger.service';
import { TableAction } from '../../../@shared/models/table-actions';
import { ActionsRendererComponent } from '../../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { OrganizationService } from '@app/modules/organizations/organization.service';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Organization } from '@shared/models/organization';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const log = new Logger('Orgs');

@UntilDestroy()
@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent implements OnInit {
  orgs: Organization[] = [];

  countries: ISelectableItem[] = [];

  constructor(
    private router: Router,
    private orgService: OrganizationService,
    private selectorService: DataService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData(): void {
    forkJoin([this.selectorService.countries, this.orgService.getAll()])
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.countries = res[0] || [];
        this.orgs = res[1] || [];
      });
  }

  get columns(): ColDef[] {
    return [
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
        wrapText: true,
        cellStyle: {
          'line-height': '1',
        },
        cellRenderer: (params) => {
          return params.value ? `<a href="${params.value}">${params.value}</a>` : '-';
        },
      },
      {
        field: 'address',
        headerName: 'Dirección',
        cellRenderer: (params) => {
          return params.value || '-';
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
                this.router.navigate(['organizations', id]);
              } else {
                log.error('Row id not found!...');
              }
            }
            if (type == TableAction.DELETE) {
              const id = row?.id;
              if (id) {
                this.orgService
                  .delete(id)
                  .pipe(untilDestroyed(this))
                  .subscribe(() => {
                    this.fetchData();
                    this.uiService.notifySuccess('Institucion eliminada con exito.');
                  });
              }
            }
          },
        },
      },
    ];
  }

  addOrganization(): void {
    this.router.navigate(['organizations', 'new']);
  }
}
