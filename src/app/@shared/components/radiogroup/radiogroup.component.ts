import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, OnInit, Input, Self } from '@angular/core';
import { ISelectableItem } from '@app/@shared/models/selectable-item';
import { Optional } from 'ag-grid-community';
import { DataService } from '@app/@shared/services/data.service';

@Component({
  selector: 'app-radiogroup',
  templateUrl: './radiogroup.component.html',
  styleUrls: ['./radiogroup.component.scss'],
})
export class RadiogroupComponent implements OnInit, ControlValueAccessor {
  @Input() label?: string;
  @Input() inline = true;

  @Input() selectors: ISelectableItem[] = [];

  value?: any;
  onChange?: (_: any) => {};
  onTouch?: () => {};

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

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onCheckedChange(value: any): void {
    this.value = value;
    this.onChange?.(this.value);
    this.onTouch?.();
  }
}
