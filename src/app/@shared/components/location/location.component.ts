import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Location } from '@app/@shared/models/location';
import { ISelectableItem } from '@app/@shared/models/selectable-item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input()
  location: Location = new Location();

  @Input()
  placeholder = 'Ubicación';
  @Input()
  label = '';
  @Input()
  helperText?: string;

  value?: any;
  disabled = false;
  onChange?: (_: any) => {};
  onTouch?: () => {};

  @Output()
  locationChange = new EventEmitter();

  @Input()
  countries: ISelectableItem[] = [];

  constructor(
    private modal: NgbModal,
    private cdRef: ChangeDetectorRef,
    @Optional()
    @Self()
    private ngControl?: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
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

  openModal(modal: any): void {
    this.modal.open(modal, { size: 'lg', centered: true, backdrop: 'static' }).result.then(
      () => {
        this.value = this.location;
        this.onChange?.(this.value);
        this.onTouch?.();
        this.locationChange.emit(this.value);
      },
      () => {}
    );
  }

  get inputValue(): string {
    const countryName = this.countries.find((c) => c.id == this.location.country)?.name;
    return `${this.location.city || ''}${this.location.state ? ', ' + this.location.state : ''}${
      countryName ? ', ' + countryName : ''
    }`;
  }

  get valid(): boolean {
    return this.ngControl?.valid;
  }

  get untouched(): boolean {
    return this.ngControl?.untouched;
  }
}
