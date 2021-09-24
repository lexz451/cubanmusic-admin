import Scrollbar from 'smooth-scrollbar';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  AfterViewInit,
  NgZone,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { ColDef, GridOptions, RowClickedEvent } from 'ag-grid-community';
import { TableHeaderComponent } from './table-header.component';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
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

  constructor(private _zone: NgZone) {}

  ngAfterViewInit(): void {}

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
      onGridSizeChanged: () => {
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
      rowHeight: this.rowHeight || 38,
    };
  }

  ngOnDestroy() {}

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
