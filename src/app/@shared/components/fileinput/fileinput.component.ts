import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ValidationControl } from '@app/@shared/validation/validation-control';
import { Component, OnInit, Input, Optional, Self, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-fileinput',
  templateUrl: './fileinput.component.html',
  styleUrls: ['./fileinput.component.scss'],
})
export class FileInputComponent extends ValidationControl implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() helperText?: string;
  @Input() multiple: boolean = false;
  @Input() accept = 'image/x-png,image/jpeg';

  @Input() showPanel = false;

  value?: File | File[];
  disabled = false;
  onChange?: (_: any) => {};
  onTouch?: () => {};

  @ViewChild('input', { static: false }) fileInput: ElementRef<HTMLElement> | undefined;
  @ViewChild('img', { static: false }) preview: ElementRef<HTMLImageElement> | undefined;

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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.value) {
      const reader = new FileReader();
      reader.onload = () => {
        this.preview.nativeElement.src = `${reader.result}`;
      }
      reader.readAsDataURL(this.multiple ? this.value[0] : this.value);
    }
  }

  get displayText(): string | null {
    if (!this.value) return null;
    return this.value instanceof File ? this.value?.name : this.value?.map((e) => e.name).join('\n');
  }

  selectFile(): void {
    this.fileInput?.nativeElement?.click();
  }

  onFileChange(event: any) {
    if (this.multiple) {
      this.value = event.target.files;
    } else {
      this.value = event.target.files[0];
    }
    if (this.showPanel) {
      let file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const res = reader.result;
        this.preview.nativeElement.src = `${res}`
      }
    }
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

  get valid(): boolean {
    return this.ngControl?.valid;
  }

  get untouched(): boolean {
    return this.ngControl?.untouched;
  }
}
