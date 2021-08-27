import { finalize } from 'rxjs/operators';
import { UiService } from './../../@shared/services/ui.service';
import { Logger } from './../../@shared/logger.service';
import { TableAction } from './../../@shared/models/table-actions';
import { ActionsRendererComponent } from './../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { OrganizationService } from '@app/organizations/organization.service';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Organization } from '@shared/models/organization';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@app/@shared';

const log = new Logger('Orgs');

@UntilDestroy()
@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent implements OnInit {
  orgs: Organization[] = [];

  constructor(private router: Router, private orgService: OrganizationService,
    private uiService: UiService) {}

  ngOnInit() {
    this.uiService.showLoading();
    this.orgService.getAll().pipe(untilDestroyed(this), finalize(() => this.uiService.hideLoading()))
      .subscribe(res => {
        this.orgs = res || [];
      });
  }

  get columns(): ColDef[] {
    return [
      {
        field: 'name',
        headerName: 'Nombre',
      },
      {
        field: 'phone',
        headerName: 'Teléfono',
        cellRenderer: params => {
          const phone = params.value;
          return `(${phone.code}) ${phone.number}`;
        }
      },
      {
        field: 'email',
        headerName: 'Email',
      },
      {
        field: 'country',
        headerName: 'País',
        cellRenderer: params => {
          const country = params?.value;
          if (!country) return '-';
          return `${country?.emoji} ${country?.name}`;
        }
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
                this.router.navigate(['organizations', id]);
              } else {
                log.error('Row id not found!...');
              }
            }
          },
        }
      }
    ];
  }

  addOrganization(): void {
    this.router.navigate(['organizations', 'new']);
  }
}
