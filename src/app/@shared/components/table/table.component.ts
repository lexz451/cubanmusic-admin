import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ColDef, GridOptions, RowClickedEvent } from 'ag-grid-community';
import { TableHeaderComponent } from './table-header.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  gridReady = false;
  gridOptions: GridOptions;

  @Input() rowSelection = 'none';
  @Input() pagination = true;
  @Input() pageSize = 10;
  @Input() columns: ColDef[] = [];
  @Input() data: any[] = [];
  @Input() rowMultiSelectWithClick = false;
  @Input() rowHeight?: number;

  @Output() rowsSelected = new EventEmitter(true);

  constructor() {}

  ngOnInit() {
    this.columns = this.createColumnDefs();
    this.gridOptions = {
      onGridReady: () => {
        this.gridReady = true;
        this.updateData();
      },
      onFirstDataRendered: (e) => {
        this.gridOptions.api?.sizeColumnsToFit();
      },
      onGridColumnsChanged: () => {
        this.gridOptions.api?.sizeColumnsToFit();
      },
      onViewportChanged: () => {
        this.gridOptions.api?.sizeColumnsToFit();
      },
      onRowClicked: (e: RowClickedEvent) => {
        this.rowsSelected.emit(this.gridOptions?.api?.getSelectedRows());
      },
      context: { componentParent: this },
      columnDefs: this.columns,
      pagination: this.pagination,
      paginationPageSize: this.pageSize,
      rowSelection: this.rowSelection,
      rowHeight: this.rowHeight || 56,
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.updateData();
    }
  }

  private createColumnDefs(): ColDef[] {
    return this.columns.map((e: ColDef) => {
      return {
        headerCheckboxSelection: false,
        checkboxSelection: false,
        headerComponentFramework: TableHeaderComponent,
        headerComponentParams: {
          displayName: e.headerName,
        },
        flex: 1,
        minWidth: 100,
        ...e,
      } as ColDef;
    });
  }

  private removeData(): void {
    this.gridOptions?.api.setRowData([]);
  }

  private updateData(): void {
    this.removeData();
    this.addData(this.data);
  }

  private addData(items: any[]): void {
    this.gridOptions?.api.applyTransaction({ add: items });
  }
}
