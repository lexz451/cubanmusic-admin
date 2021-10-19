import { finalize } from 'rxjs/operators';
import { UiService } from '../../../@shared/services/ui.service';
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
        width: 250,
        autoHeight: true
      },

      {
        width: 100,
        field: 'isniCode',
        sortable: false,
        headerName: 'ISNI',
        cellRenderer: (params) => {
          if (!params.value) return '-';
          return `<a href="https://isni.org/isni/${params.value}">${params.value}</a>`;
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
