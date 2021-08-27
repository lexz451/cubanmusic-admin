import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-list-renderer',
  templateUrl: './list-renderer.component.html',
  styleUrls: ['./list-renderer.component.scss'],
})
export class ListRendererComponent implements ICellRendererAngularComp {
  data: any[] = [];

  idField: string = 'id';
  nameField: string = 'name';

  isObject = false;

  constructor() {}

  onInit(params: ICellRendererParams): void {
    this.data = params.value;
    if (params.colDef.cellRendererParams?.useObject) {
      this.isObject = true;
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
