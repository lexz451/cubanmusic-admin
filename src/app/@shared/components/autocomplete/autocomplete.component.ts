import { debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { OperatorFunction, Observable, of } from 'rxjs';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ISelectableItem } from '@shared/models/selectable-item';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  Optional,
  Self,
} from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input()
  data: ISelectableItem[] = [];
  @Input()
  label?: string;
  @Input()
  placeholder?: string;

  @Output()
  actionClick = new EventEmitter(true);

  value?: number;
  onChange: (_: any) => {};
  onTouch: () => {};
  isDisabled = false;

  searching = false;
  searchFailed = false;

  selectedItem?: ISelectableItem;

  constructor(
    @Optional()
    @Self()
    private ngControl: NgControl
  ) {
    if (ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      if (this.value) {
        this.selectedItem = this.data?.find((e) => e.id == this.value);
      }
    }
  }

  search$: OperatorFunction<string, readonly ISelectableItem[]> = ($text: Observable<string>) =>
    $text.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) => {
        if (!term || term == '') return of(this.data);
        const normalized = term.replace(/[(),'\s+]/g, '').toLowerCase();
        console.log('Normalize term to: ' + normalized);
        const _termRegEx = RegExp(normalized, 'i');
        return of(this.data.filter((l) => _termRegEx.test(l.name?.replace(/[(),'\s+]/g, '').toLowerCase())));
      }),
      tap(() => (this.searching = false))
    );

  inputFormatter = (item: ISelectableItem) => (item.icon ? item.icon + ' ' + item.name : item.name || null);

  onModelChange(): void {
    this.value = this.selectedItem?.id;
    this.onChange?.(this.value);
    this.onTouch?.();
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
      if (this.data) {
        this.selectedItem = this.data?.find((e) => e.id == this.value);
      }
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

  onActionClick() {
    this.actionClick.emit();
  }
}
