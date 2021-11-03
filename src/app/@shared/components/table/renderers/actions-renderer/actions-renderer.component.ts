import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { TableAction } from '@shared/models/table-actions';
import { Logger } from '@app/@shared/logger.service';

@Component({
  selector: 'app-actions-renderer',
  templateUrl: './actions-renderer.component.html',
  styleUrls: ['./actions-renderer.component.scss'],
})
export class ActionsRendererComponent implements ICellRendererAngularComp {
  params?: ICellRendererParams;

  actions: TableAction[] = [];

  useViewAction = false;
  useEditAction = false;
  useDeleteAction = false;

  log = new Logger('Actions');

  constructor() {}

  onView(): void {
    this.params.colDef?.cellRendererParams?.onAction(TableAction.VIEW, this.params.node.data);
  }

  onEdit(): void {
    this.params.colDef?.cellRendererParams?.onAction(TableAction.EDIT, this.params.node.data);
  }

  onDelete(): void {
    this.params.colDef?.cellRendererParams?.onAction(TableAction.DELETE, this.params.node.data);
  }

  onInit(params): void {
    this.params = params;
    const actions = this.params.colDef?.cellRendererParams?.useActions();
    if (actions && actions.length) {
      this.useViewAction = actions.includes(TableAction.VIEW);
      this.useEditAction = actions.includes(TableAction.EDIT);
      this.useDeleteAction = actions.includes(TableAction.DELETE);
    }
  }

  agInit(params: ICellRendererParams): void {
    this.onInit(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.onInit(params);
    return true;
  }
}
