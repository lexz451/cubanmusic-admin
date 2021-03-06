import { concatMap } from 'rxjs/operators';
import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { DataService } from '../../../@shared/services/data.service';
import { forkJoin } from 'rxjs';
import { UiService } from '../../../@shared/services/ui.service';
import { ListRendererComponent } from '../../../@shared/components/table/renderers/list-renderer/list-renderer.component';
import { AwardService } from '../award.service';
import { Award } from '../../../@shared/models/award';
import { Router, ActivatedRoute } from '@angular/router';
import { Logger } from '../../../@shared/logger.service';
import { TableAction } from '../../../@shared/models/table-actions';
import { ActionsRendererComponent } from '../../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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
    private route: ActivatedRoute,
    private awardService: AwardService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    const { data } = this.route.snapshot.data;
    this.countries = data[0] || [];
    this.organizations = data[1] || [];
    this.awards = data[2] || [];
  }

  get columns(): ColDef[] {
    return [
      {
        field: 'name',
        headerName: 'Nombre',
      },
      {
        field: 'countryId',
        headerName: 'Pais',
        cellRenderer: (params) => {
          const countryId = params?.value;
          const country = this.countries.find((e) => e.id == countryId);
          if (!country) return '-';
          return country.name;
        },
      },
      {
        field: 'grantedById',
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
                  .pipe(
                    untilDestroyed(this),
                    concatMap(() => this.awardService.getAll())
                  )
                  .subscribe((res) => {
                    this.awards = res || [];
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
