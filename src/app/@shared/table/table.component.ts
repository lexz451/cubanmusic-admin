import { TableHeaderComponent } from './table-header/table-header.component';
import { Subject } from 'rxjs';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  OnDestroy,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { ColDef, GridOptions, RowClickedEvent } from 'ag-grid-community';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() columnDefs: ColDef[] = [];
  @Input() data: any[] = [];
  @Input() headerHeight = 48;
  @Input() pageSize = 10;
  @Input() rowMultiSelectWithClick = false;
  @Input() bottomRowData?: any;
  @Input() pagination = true;
  @Input() rowSelection = 'single';

  @Output() rowsSelected = new EventEmitter(true);

  rowData = new Subject<any[]>();

  gridOptions?: GridOptions;

  @HostListener('window:resize', ['$event']) onResize(event: any): void {
    this.gridOptions?.api?.sizeColumnsToFit();
  }

  constructor() {}

  ngOnInit(): void {
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = {
      onGridReady: () => {
        this.rowData.next(this.data);
      },
      onFirstDataRendered: () => {
        this.gridOptions?.api?.sizeColumnsToFit();
      },
      onRowSelected: () => {},
      onRowClicked: (e: RowClickedEvent) => {
        this.rowsSelected.emit(this.gridOptions?.api?.getSelectedRows());
      },
      onGridColumnsChanged: () => {
        this.gridOptions?.api?.sizeColumnsToFit();
      },
      onViewportChanged: () => {
        this.gridOptions?.api?.sizeColumnsToFit();
      },
      rowHeight: 75,
      context: { componentParent: this },
      columnDefs: this.columnDefs,
      headerHeight: this.headerHeight,
      rowSelection: this.rowSelection,
      pinnedBottomRowData: this.bottomRowData,
      rowMultiSelectWithClick: this.rowMultiSelectWithClick,
      pagination: this.pagination,
      paginationPageSize: this.pageSize,
    };
  }

  private createColumnDefs(): ColDef[] {
    return this.columnDefs.map((col: ColDef) => {
      return {
        headerCheckboxSelection: false,
        checkboxSelection: false,
        flex: 1,
        minWidth: 100,
        headerComponentFramework: TableHeaderComponent,
        headerComponentParams: {
          displayName: col.headerName,
        },
        ...col,
      };
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && !changes.data.isFirstChange()) {
      this.rowData.next(this.data);
    }
  }

  ngOnDestroy(): void {
    this.rowData.unsubscribe();
  }
}
