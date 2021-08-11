import { Component, OnInit } from '@angular/core';
import { TableAction } from '@app/@core/enum/table-action.enum';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-actions-renderer',
  templateUrl: './actions-renderer.component.html',
  styleUrls: ['./actions-renderer.component.scss'],
})
export class ActionsRendererComponent implements ICellRendererAngularComp {
  params?: ICellRendererParams;

  actions: TableAction[] = [];

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    this.actions = this.params?.colDef?.cellRendererParams?.useActions();
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.actions = this.params?.colDef?.cellRendererParams?.useActions();
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}

  onView(): void {
    this.params?.colDef?.cellRendererParams?.onAction(TableAction.VIEW, this?.params?.node?.data);
  }

  onEdit(): void {
    this.params?.colDef?.cellRendererParams?.onAction(TableAction.EDIT, this?.params?.node?.data);
  }

  onDelete(): void {
    this.params?.colDef?.cellRendererParams?.onAction(TableAction.DELETE, this?.params?.node?.data);
  }

  get useEditAction(): boolean {
    return this.actions.includes(TableAction.EDIT);
  }

  get useDeleteAction(): boolean {
    return this.actions.includes(TableAction.DELETE);
  }

  get useViewAction(): boolean {
    return this.actions.includes(TableAction.VIEW);
  }
}
