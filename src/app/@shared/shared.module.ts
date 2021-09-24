import { SelectorComponent } from './components/selector/selector.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { FileInputComponent } from './components/fileinput/fileinput.component';
import { TagsComponent } from './components/tags/tags.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { CheckComponent } from './components/check/check.component';
import { CheckgroupComponent } from './components/checkgroup/checkgroup.component';
import { InputComponent } from './components/input/input.component';
import { LocationComponent } from './components/location/location.component';
import { RadiogroupComponent } from './components/radiogroup/radiogroup.component';
import { SelectComponent } from './components/select/select.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiselectComponent } from './components/multiselect/multiselect.component';
import { UidDirective } from './directives/uid.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { TableComponent } from './components/table/table.component';
import { TableHeaderComponent } from './components/table/table-header.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { NgbDatepickerModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionsRendererComponent } from './components/table/renderers/actions-renderer/actions-renderer.component';
import { ListRendererComponent } from './components/table/renderers/list-renderer/list-renderer.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { PhoneInputComponent } from './components/phone-input/phone-input.component';
import { TagInputModule } from 'ngx-chips';
import { CoordinatesModule } from 'angular-coordinates';
import { CoordinateValidator } from './validation/coordinates-validator';
import { NgSelectModule } from '@ng-select/ng-select';

// @ts-ignore
@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    NgMultiSelectDropDownModule,
    NgbDatepickerModule,
    PhotoGalleryModule.forRoot({
      defaultOptions: {
        arrowEl: true,
        arrowKeys: true,
        closeEl: true,
        closeOnScroll: false,
      },
    }),
    NgbModule,
    TagInputModule,
    CoordinatesModule,
    NgbNavModule,
    NgSelectModule,
  ],
  declarations: [
    CheckComponent,
    CheckgroupComponent,
    InputComponent,
    LocationComponent,
    MultiselectComponent,
    RadiogroupComponent,
    SelectComponent,
    TableComponent,
    TableHeaderComponent,
    TagsComponent,
    FileInputComponent,
    DatepickerComponent,
    ActionsRendererComponent,
    ListRendererComponent,
    GalleryComponent,
    SelectorComponent,
    PhoneInputComponent,
    AutocompleteComponent,
    ClickOutsideDirective,
    CoordinateValidator,
    UidDirective,
  ],
  exports: [
    CheckComponent,
    CheckgroupComponent,
    InputComponent,
    LocationComponent,
    MultiselectComponent,
    RadiogroupComponent,
    SelectComponent,
    TableComponent,
    DatepickerComponent,
    GalleryComponent,
    PhoneInputComponent,
    SelectorComponent,
    TagsComponent,
    FileInputComponent,
    AutocompleteComponent,

    ClickOutsideDirective,
    CoordinateValidator,
    UidDirective,

    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
  ],
})
export class SharedModule {}
