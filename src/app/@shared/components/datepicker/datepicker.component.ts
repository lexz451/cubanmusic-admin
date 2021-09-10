import { Component, Injectable, Input, OnInit, Optional, Self } from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Injectable()
export class CustomDateAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        year: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        day: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        year: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        day: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day : '';
  }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {
      provide: NgbDateAdapter,
      useClass: CustomDateAdapter,
    },
    {
      provide: NgbDateParserFormatter,
      useClass: CustomDateParserFormatter,
    },
  ],
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = 'DD-MM-YYYY';
  @Input() label = '';
  @Input() disabled = false;

  value?: string;
  onChange?: (value: any) => {};
  onTouch?: () => {};

  constructor(
    private dateAdapter: NgbDateAdapter<string>,
    private calendar: NgbCalendar,
    @Optional()
    @Self()
    private ngControl: NgControl
  ) {
    if (ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }

  get today() {
    return this.calendar.getToday();
  }

  get minDate(): NgbDateStruct {
    return {
      day: this.today.day,
      month: this.today.month,
      year: this.today.year - 500,
    };
  }

  get maxDate(): NgbDateStruct {
    return {
      day: this.today.day,
      month: this.today.month,
      year: this.today.year + 1,
    };
  }

  onDateChange(date: NgbDate): void {
    this.value = this.dateAdapter.toModel(date);
    this.onChange?.(this.value);
    this.onTouch?.();
  }
}
