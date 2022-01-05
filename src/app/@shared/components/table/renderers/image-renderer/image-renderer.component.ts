import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-image-renderer',
  templateUrl: './image-renderer.component.html',
  styleUrls: ['./image-renderer.component.scss']
})
export class ImageRendererComponent implements ICellRendererAngularComp {

  imgRes: string;

  width: number = 24;
  height: number = 24;

  onInit(params: any) {
    if (params.mapValues) {
      this.imgRes = params.mapValues[params.value];
    } else {
      this.imgRes = params.value;
    }
    this.width = params.width || 24;
    this.height = params.height || 24;
  }

  refresh(params: ICellRendererParams): boolean {
    this.onInit(params);
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.onInit(params);
  }
}
