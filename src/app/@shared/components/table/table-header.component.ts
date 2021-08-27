import { Component, HostListener } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  template: `
    <div class="column-header">
      <span class="column-header-name mr-2">{{ params?.displayName }}</span>
      <i class="column-header-sort fas fa-angle-up" *ngIf="sort === 'asc'"></i>
      <i class="column-header-sort fas fa-angle-down" *ngIf="sort === 'desc'"></i>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .column-header {
          display: flex;
          align-items: center;
          .column-header-sort {
            margin-left: 0.2rem;
          }
        }
      }
    `,
  ],
})
export class TableHeaderComponent implements IHeaderAngularComp {
  params?: IHeaderParams;
  sort: string | null | undefined;

  @HostListener('click') onClick = () => {
    this.toggleSort();
  };

  refresh(params: IHeaderParams): boolean {
    this.params = params;
    this.sort = params.column.getSort();
    return true;
  }

  agInit(params: IHeaderParams) {
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
