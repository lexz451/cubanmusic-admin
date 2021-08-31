import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Component, Input, OnInit, Optional, Self } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() placeholder: string = 'Insertar';

  value: any[] = [];
  onChange: (_: any) => {};
  onTouch: () => {};
  isDisabled = false;

  constructor(
    @Optional()
    @Self()
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onInputChange(items: string[]): void {
    this.value = items;
    this.onChange?.(this.value);
    this.onTouch?.();
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {}
}
