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

  @Input() phone: Phone = new Phone();
  @Output() phoneChange = new EventEmitter();

  @Input()
  countries: Country[] = [];

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
        this.phone.code = this.selectedCountry.phoneCode;
      }
    }
  }

  onCountrySelected(country: Country): void {
    this.selectedCountry = country;
    this.phone.code = country.phoneCode;
    this.phoneChange.emit(this.phone);
  }

  valueChange(): void {
    this.phoneChange.emit(this.phone);
  }
}
