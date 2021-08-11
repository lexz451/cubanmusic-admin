import { Component, OnInit, HostListener } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
})
export class TableHeaderComponent implements IHeaderAngularComp {
  params?: IHeaderParams;
  sort: string | null | undefined;

  @HostListener('click') onClick = () => {
    this.toggleSort();
  };

  refresh(params: IHeaderParams): boolean {
    this.params = params;
    return true;
  }

  agInit(params: IHeaderParams): void {
    this.params = params;
    this.sort = params.column.getSort();
    this.params.column.addEventListener('sortChanged', () => {
      this.sort = this.params?.column.getSort();
    });
  }

  toggleSort(): void {
    let sort = 'asc';
    if (!this.sort) {
      sort = 'desc';
    } else if (this.sort === 'asc') {
      sort = 'desc';
    } else if (this.sort === 'desc') {
      sort = 'asc';
    }
    this.params?.column.setSort(sort);
    this.params?.api.onSortChanged();
  }
}
