import { Component, OnInit, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() icon?: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type = 'text';

  value?: any;
  disabled = false;
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
    this.disabled = isDisabled;
  }

  ngOnInit() {}

  get valid(): boolean {
    return this.ngControl.valid;
  }

  get untouched(): boolean {
    return this.ngControl.untouched;
  }

  get errorText(): string {
    return 'E';
  }
}
