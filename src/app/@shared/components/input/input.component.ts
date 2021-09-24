import { Component, OnInit, Input, Optional, Self, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ValidationControl } from '@app/@shared/validation/validation-control';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends ValidationControl implements OnInit, ControlValueAccessor {
  @Input() icon?: string;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type = 'text';
  @Input() helperText?: string;
  @Input() controlType: 'input' | 'textarea' = 'input';
  @Input() showAction = false;

  value?: any;
  disabled = false;
  onChange?: (_: any) => {};
  onTouch?: () => {};

  constructor(
    @Optional()
    @Self()
    private ngControl: NgControl
  ) {
    super(ngControl);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onValueChange(value: string) {
    this.value = value;
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
    this.disabled = isDisabled;
  }

  ngOnInit() {}

  get valid(): boolean {
    return this.ngControl?.valid;
  }

  get untouched(): boolean {
    return this.ngControl?.untouched;
  }
}
