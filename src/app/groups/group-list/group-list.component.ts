import { finalize } from 'rxjs/operators';
import { UiService } from './../../@shared/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ListRendererComponent } from '@shared/components/table/renderers/list-renderer/list-renderer.component';
import { ActionsRendererComponent } from '@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { TableAction } from '@shared/models/table-actions';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Logger, untilDestroyed, UntilDestroy } from '@shared';
import { Group } from '@shared/models/group';
import { GroupService } from '../group.service';

const log = new Logger('Groups');

@UntilDestroy()
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];

  constructor(private groupService: GroupService, private datePipe: DatePipe, private router: Router) {}

  ngOnInit(): void {
    this.groupService
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.groups = res || [];
      });
  }

  addGroup(): void {
    this.router.navigate(['groups', 'new']);
  }

  get columns(): ColDef[] {
    return [
      {
        field: 'name',
        sortable: true,
        headerName: 'Nombre',
      },
      {
        field: 'birthDate',
        headerName: 'Fecha de Nacimiento',
        cellRenderer: (params) => {
          return this.datePipe.transform(params.value, 'YYYY-MM-dd');
        },
      },
      {
        field: 'deathDate',
        headerName: 'Fecha de Muerte',
        cellRenderer: (params) => {
          return this.datePipe.transform(params.value, 'YYYY-MM-dd');
        },
      },
      {
        field: 'birthPlace',
        width: 150,
        headerName: 'Lugar de Nacimiento',
        cellRenderer: (params) => {
          return `${params.value?.city || '-'} / ${params.value?.state || '-'} / ${params.value?.country?.name || '-'}`;
        },
      },
      {
        field: 'deathPlace',
        width: 150,
        headerName: 'Lugar de Muerte',
        cellRenderer: (params) => {
          return `${params.value?.city || '-'} / ${params.value?.state || '-'} / ${params.value?.country?.name || '-'}`;
        },
      },
      {
        field: 'residencePlace',
        width: 100,
        headerName: 'Residencia',
        cellRenderer: (params) => {
          return `${params.value?.city || '-'} / ${params.value?.state || '-'} / ${params.value?.country?.name || '-'}`;
        },
      },
      {
        field: 'gender',
        width: 50,
        headerName: 'Género',
      },
      {
        field: 'jobTitle',
        width: 50,
        headerName: 'Ocupación',
        cellRenderer: (params) => {
          return params?.value?.title || '-';
        },
      },
      {
        field: 'jobRoles',
        width: 100,
        headerName: 'Roles',
        cellRendererFramework: ListRendererComponent,
        cellRendererParams: {},
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
                this.router.navigate(['groups', id]);
              } else {
                log.error('Row id not found!...');
              }
            }
          },
        },
        width: 100,
      },
    ];
  }
}
