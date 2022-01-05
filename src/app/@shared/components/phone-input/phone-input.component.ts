import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Phone } from '@shared/models/phone';
import { Country } from '@shared/models/country';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
})
export class PhoneInputComponent implements OnInit, OnChanges {
  selectedCountry: Country;

  @Input() phone?: Phone;
  @Output() phoneChange = new EventEmitter();

  @Input()
  countries: any[] = [];

  @Input()
  placeholder = 'Teléfono';
  @Input()
  label = '';
  @Input()
  helperText?: string;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.countries && this.countries.length) {
      if (!this.selectedCountry) {
        this.selectedCountry = this.countries[0];
        if (!this.phone) {
          this.phone = new Phone();
        }
        this.phone.code = this.selectedCountry.phoneCode;
      }
    }
  }

  onCountryChange(country: Country): void {
    this.selectedCountry = country;
    if (!this.phone) {
      this.phone = new Phone();
    }
    this.phone.code = country.phoneCode;
    this.phoneChange.emit(this.phone);
  }

  onNumberChange(number: string): void {
    if (!this.phone) {
      this.phone = new Phone();
    }
    this.phone.number = number;
    this.phoneChange.emit(this.phone);
  }
}
