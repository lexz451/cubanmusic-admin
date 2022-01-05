import { ControlValueAccessor, NgControl } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  Optional,
  Self,
  ViewEncapsulation,
  TemplateRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ISelectableItem } from '@app/@shared/models/selectable-item';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectorComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input()
  data?: any[] = [];

  @Input()
  label?: string;
  @Input()
  placeholder: string = 'Seleccionar';
  @Input()
  multiple = false;
  @Input()
  showCreate = false;
  @Input()
  canAdd = false;

  @Input() bindTo = 'id';
  @Input() bindLabel = 'name';

  @Input() optionTemplate: TemplateRef<any>;
  @Input() labelTemplate: TemplateRef<any>;

  get isEmpty(): boolean {
    return this.multiple ? !this.value || !this.value.length : !this.value;
  }

  @Output()
  create = new EventEmitter(true);

  value?: any;
  onChange: (_: any) => {};
  onTouch: () => {};

  isDisabled = false;

  constructor(
    @Optional()
    @Self()
    _ngControl: NgControl
  ) {
    if (_ngControl) {
      _ngControl.valueAccessor = this;
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
    this.isDisabled = isDisabled;
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {

  }

  onCreate(): void {
    this.create.emit();
  }

  onModelChange(): void {
    this.onChange?.(this.value);
    this.onTouch?.();
  }

  onModelClear(): void {
    //this.value = null;
    this.onChange?.(this.value);
    this.onTouch?.();
  }
}
