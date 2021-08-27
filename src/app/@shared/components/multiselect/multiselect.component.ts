import { Component, Input, OnChanges, OnInit, Optional, Self, SimpleChanges } from '@angular/core';
import { ISelectableItem } from '@app/@shared/models/selectable-item';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css'],
})
export class MultiselectComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() placeholder = 'Seleccionar';
  @Input() label = '';
  @Input() items: ISelectableItem[] = [];
  @Input() selectedItems: ISelectableItem[] = [];

  onChange: (_) => {};
  onTouch: () => {};
  value?: number[] = [];

  settings: IDropdownSettings = {
    allowSearchFilter: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Seleccionar Todo',
    unSelectAllText: 'Deseleccionar Todo',
  };

  onItemSelected(item: ISelectableItem) {
    this.value.push(item.id);
    this.onChange?.(this.value);
    this.onTouch?.();
  }

  onSelectAll(items: ISelectableItem[]) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      if (this.value) {
        this.selectedItems = this.items.filter((e) => this.value.includes(e.id));
      }
    }
  }

  constructor(
    @Optional()
    @Self()
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }
}
