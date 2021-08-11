import { I18nModule } from './../i18n/i18n.module';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsRendererComponent } from './table/renderers/actions-renderer/actions-renderer.component';
import { TableHeaderComponent } from './table/table-header/table-header.component';
import { TableComponent } from './table/table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { AgGridModule } from 'ag-grid-angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    FormsModule,
    ReactiveFormsModule,
    I18nModule,
    TranslateModule,
  ],
  declarations: [LoaderComponent, TableComponent, TableHeaderComponent, ActionsRendererComponent, InputComponent],
  exports: [LoaderComponent, TableComponent, TableHeaderComponent, ActionsRendererComponent, InputComponent],
})
export class SharedModule {}
