import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Self,
  SimpleChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { ISelectableItem } from '@app/@shared/models/selectable-item';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectComponent implements OnInit, ControlValueAccessor, AfterViewInit, OnChanges {
  @Input() placeholder = 'Seleccionar';
  @Input() label = '';
  @Input() items: ISelectableItem[] = [];
  @Input() showAction = false;

  @Output() actionClicked = new EventEmitter(true);

  getSelection(): ISelectableItem[] {
    if (this.items && this.items.length && this.value) {
      const selection = this.items.filter((item) => this.value.indexOf(item.id) != -1);
      return selection;
    }
    return [];
  }

  onChange: (_: any) => {};
  onTouch: () => {};
  value?: number[] = [];

  settings: IDropdownSettings = {
    allowSearchFilter: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Seleccionar Todo',
    unSelectAllText: 'Deseleccionar Todo',
  };

  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  onItemSelected(item: ISelectableItem) {
    this.value.push(item.id);
    this.onChange?.(this.value);
    this.onTouch?.();
  }

  onActionClicked() {
    this.actionClicked.emit();
  }

  onSelectAll(items: ISelectableItem[]) {
    this.value = items.map((e) => e.id);
    this.onChange?.(this.value);
    this.onTouch?.();
  }

  constructor(
    private cdRef: ChangeDetectorRef,
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
