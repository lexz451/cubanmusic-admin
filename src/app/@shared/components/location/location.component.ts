import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  catchError,
  takeUntil,
  mergeMap,
  withLatestFrom,
  concatMap,
} from 'rxjs/operators';

import { of, OperatorFunction, Observable, forkJoin, Subscription, zip, concat } from 'rxjs';
import {
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
import { DataService } from '@app/@shared/services/data.service';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { zipWith } from 'lodash';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input()
  placeholder = 'Ubicación';
  @Input()
  label = '';
  @Input()
  helperText?: string;

  value?: number;
  disabled = false;
  onChange?: (_: any) => {};
  onTouch?: () => {};

  location = new Location();
  locations: ISelectableItem[] = [];

  countries$: Observable<ISelectableItem[]>;

  searchFailed = false;
  searching = false;

  subscriptions$: Subscription[] = [];

  search: OperatorFunction<string, readonly Location[]> = ($text: Observable<string>) =>
    $text.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) => {
        if (!term || term == '') return of(this.locations);
        const normalized = term.replace(/[(),'\s+]/g, '').toLowerCase();
        console.log('Normalize term to: ' + normalized);
        const _termRegEx = RegExp(normalized, 'i');
        return of(this.locations.filter((l) => _termRegEx.test(l.name.replace(/[(),'\s+]/g, '').toLowerCase())));
      }),
      tap(() => (this.searching = false))
    );

  formatInput = (item: ISelectableItem) => {
    if (item.name) {
      return item.name;
    }
    return null;
  };

  constructor(
    private modal: NgbModal,
    private dataService: DataService,
    @Optional()
    @Self()
    private ngControl?: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.countries$ = this.dataService.countries;
    this.subscriptions$.push(
      this.dataService.locations.subscribe((res) => {
        this.locations = res || [];
        if (this.value) {
          this.location = this.locations.find((l) => l.id == this.value);
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {}

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
    // reset Location on modal open...
    this.location = new Location();
    this.modal.open(modal, { size: 'lg', centered: true, backdrop: 'static' }).result.then(
      () => {
        this.subscriptions$.push(
          this.dataService.createLocation(this.location).subscribe((locationId) => {
            this.subscriptions$.push(
              this.dataService.locations.subscribe((res) => {
                this.locations = res;
                this.location = this.locations.find((l) => l.id == locationId);
              })
            );
          })
        );
      },
      () => {}
    );
  }

  get valid(): boolean {
    return this.ngControl?.valid;
  }

  get untouched(): boolean {
    return this.ngControl?.untouched;
  }
}
