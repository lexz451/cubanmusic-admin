import { ISelectableItem } from './../../@shared/models/selectable-item';
import { DataService } from '../../@shared/services/data.service';
import { forkJoin } from 'rxjs';
import { Country } from './../../@shared/models/country';
import { UiService } from './../../@shared/services/ui.service';
import { ListRendererComponent } from './../../@shared/components/table/renderers/list-renderer/list-renderer.component';
import { AwardService } from './../award.service';
import { Award } from './../../@shared/models/award';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from './../../@shared/logger.service';
import { TableAction } from './../../@shared/models/table-actions';
import { ActionsRendererComponent } from './../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';

const log = new Logger('Awards');

@UntilDestroy()
@Component({
  selector: 'app-award-list',
  templateUrl: './award-list.component.html',
  styleUrls: ['./award-list.component.scss'],
})
export class AwardListComponent implements OnInit {
  awards: Award[] = [];
  countries: ISelectableItem[] = [];
  organizations: ISelectableItem[] = [];

  constructor(
    private router: Router,
    private awardService: AwardService,
    private selectorService: DataService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData(): void {
    forkJoin([this.selectorService.countries, this.selectorService.organizations, this.awardService.getAll()])
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.countries = res[0] || [];
        this.organizations = res[1] || [];
        this.awards = res[2] || [];
      });
  }

  get columns(): ColDef[] {
    return [
      {
        field: 'title',
        headerName: 'Nombre',
      },
      {
        field: 'country',
        headerName: 'Pais',
        cellRenderer: (params) => {
          const countryId = params?.value;
          const country = this.countries.find((e) => e.id == countryId);
          if (!country) return '-';
          return `${country.icon} ${country.name}`;
        },
      },
      {
        field: 'grantedBy',
        headerName: 'Otorgado por',
        cellRenderer: (params) => {
          const orgId = params?.value;
          const org = this.organizations.find((e) => e.id == orgId);
          if (!org) return '-';
          return org.name;
        },
      },
      {
        field: 'categories',
        headerName: 'Categorias',
        cellRendererFramework: ListRendererComponent,
      },
      {
        cellRendererFramework: ActionsRendererComponent,
        cellRendererParams: {
          useActions: (): TableAction[] => {
            return [TableAction.EDIT, TableAction.DELETE];
          },
          onAction: (type: TableAction, row: any) => {
            const id = row?.id;
            if (type == TableAction.EDIT) {
              id && this.router.navigate(['awards', id]);
            }
            if (type == TableAction.DELETE) {
              id &&
                this.awardService
                  .delete(id)
                  .pipe(untilDestroyed(this))
                  .subscribe(() => {
                    this.fetchData();
                    this.uiService.notifySuccess('Premio eliminado con exito.');
                  });
            }
          },
        },
      },
    ];
  }

  addAward(): void {
    this.router.navigate(['awards', 'new']);
  }
}
