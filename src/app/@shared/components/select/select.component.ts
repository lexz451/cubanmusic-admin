import { ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Self,
  SimpleChanges,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { ISelectableItem } from '@app/@shared/models/selectable-item';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit, OnChanges, ControlValueAccessor {
  isOpen = false;
  isDisabled = false;
  showInvalid = false;

  @Input() placeholder = 'Seleccionar';
  @Input() label = '';
  @Input() items: ISelectableItem[] = [];

  item?: ISelectableItem;

  onChange?: (value?: any) => {};
  onTouch?: () => {};

  value?: number;

  constructor(
    @Optional()
    @Self()
    private ngControl: NgControl,
    private cdRef: ChangeDetectorRef
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items && !changes.items.isFirstChange()) {
      if (this.value) {
        this.item = this.items.find((e) => e.id == this.value);
      }
    }
  }

  ngOnInit() {}

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  onBlur(): void {
    this.onTouch?.();
  }

  onDefaultOptionSelected(): void {
    this.item = null;
    this.value = null;
    this.onChange?.(this.value);
    this.onTouch?.();
    this.isOpen = false;
    console.log('Clicked');
  }

  onItemSelected(item: ISelectableItem) {
    this.item = item;
    this.value = item.id;
    this.onChange?.(this.value);
    this.onTouch?.();
    this.isOpen = false;
    console.log(item);
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
      this.item = this.items.find((e) => e.id === value);
    } else {
      this.item = null;
      this.value = null;
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

  get errors(): ValidationErrors {
    return this.ngControl?.errors;
  }

  trackItemBy: TrackByFunction<ISelectableItem> = (index: number, item: ISelectableItem) => {
    return `${index}-${item.id}`;
  };
}
