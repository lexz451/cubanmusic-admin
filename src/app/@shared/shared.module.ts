import { LocationComponent } from './location/location.component';
import { RadiogroupComponent } from './radiogroup/radiogroup.component';
import { SelectComponent } from './select/select.component';
import { UidDirective } from './_directives/uid.directive';
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
import { ClickOutsideDirective } from './_directives/click-outside.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiselectComponent } from './multiselect/multiselect.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AgGridModule.withComponents([]),
    FormsModule,
    ReactiveFormsModule,
    I18nModule,
    TranslateModule,
    NgMultiSelectDropDownModule,
  ],
  declarations: [
    LoaderComponent,
    TableComponent,
    TableHeaderComponent,
    ActionsRendererComponent,
    InputComponent,
    SelectComponent,
    RadiogroupComponent,
    LocationComponent,
    MultiselectComponent,
    UidDirective,
    ClickOutsideDirective,
  ],
  exports: [
    LoaderComponent,
    TableComponent,
    TableHeaderComponent,
    ActionsRendererComponent,
    InputComponent,
    SelectComponent,
    RadiogroupComponent,
    LocationComponent,
    MultiselectComponent,
    UidDirective,
    ClickOutsideDirective,
  ],
})
export class SharedModule {}
