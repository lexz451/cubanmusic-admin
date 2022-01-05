import { ImageRendererComponent } from './components/table/renderers/image-renderer/image-renderer.component';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { ListviewSelectorComponent } from './components/listview/listview-selector/listview-selector.component';
import { ListviewComponent } from './components/listview/listview.component';
import { SelectorComponent } from './components/selector/selector.component';
import { FileInputComponent } from './components/fileinput/fileinput.component';
import { TagsComponent } from './components/tags/tags.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { InputComponent } from './components/input/input.component';
import { RadiogroupComponent } from './components/radiogroup/radiogroup.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
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
import { PwdMatchValidator } from './validation/pwd-match-validator';
import { IsNumberValidator } from './validation/is-number-validator';
import { MinMaxValidator } from './validation/min-max-validator';

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
    NgOptionHighlightModule
  ],
  declarations: [
    InputComponent,
    RadiogroupComponent,
    TableComponent,
    TableHeaderComponent,
    TagsComponent,
    FileInputComponent,
    DatepickerComponent,
    ActionsRendererComponent,
    ListRendererComponent,
    ImageRendererComponent,
    GalleryComponent,
    SelectorComponent,
    PhoneInputComponent,
    ListviewComponent,
    ListviewSelectorComponent,
    ClickOutsideDirective,
    CoordinateValidator,
    PwdMatchValidator,
    IsNumberValidator,
    MinMaxValidator,
    UidDirective,
  ],
  exports: [
    InputComponent,
    RadiogroupComponent,
    TableComponent,
    DatepickerComponent,
    GalleryComponent,
    PhoneInputComponent,
    SelectorComponent,
    TagsComponent,
    FileInputComponent,
    ListviewComponent,
    ListviewSelectorComponent,
    ClickOutsideDirective,
    CoordinateValidator,
    PwdMatchValidator,
    IsNumberValidator,
    MinMaxValidator,
    UidDirective,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
  ],
})
export class SharedModule {}
