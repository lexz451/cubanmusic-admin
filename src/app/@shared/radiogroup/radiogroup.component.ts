import { ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-radiogroup',
  templateUrl: './radiogroup.component.html',
  styleUrls: ['./radiogroup.component.scss'],
})
export class RadiogroupComponent implements OnInit, ControlValueAccessor {
  @Input() label?: string;
  @Input() inline = true;
  @Input() selectors: any[] = [
    {
      value: true,
      name: 'Si',
    },
    {
      value: false,
      name: 'No',
    },
  ];

  value?: any;
  onChange?: (_: any) => {};
  onTouch?: () => {};

  constructor() {}

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
