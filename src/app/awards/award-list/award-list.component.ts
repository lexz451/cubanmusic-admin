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

  constructor(private router: Router, private route: ActivatedRoute, private awardService: AwardService) {}

  ngOnInit() {
    this.awardService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.awards = res || [];
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
          const country = params?.value;
          if (!country) return '-';
          return `${country.emoji} ${country.name}`;
        },
      },
      {
        field: 'grantedBy',
        headerName: 'Otorgado por',
        cellRenderer: (params) => {
          const org = params?.value;
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
            if (type == TableAction.EDIT) {
              const id = row?.id;
              if (id) {
                this.router.navigate(['awards', id]);
              } else {
                log.error('Row id not found!...');
              }
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
