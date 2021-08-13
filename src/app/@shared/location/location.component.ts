import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Country } from '@app/@core/model/country';
import { Location } from '@app/@core/model/location';
import { SelectableItem } from '@app/@core/model/selectable-item';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @Input()
  location: Location = new Location();

  @Input()
  label = 'Ubicación';

  @Output()
  locationChange = new EventEmitter();

  @Input()
  countries: Country[] = [];

  constructor() {}

  ngOnInit() {}

  onCountryChange(countryId: number): void {
    if (countryId && this.countries.length) {
      this.location.country = this.countries.find((e) => e.id == countryId);
      this.locationChange.emit(this.location);
    }
  }

  onCityChange(city: string): void {
    this.location.city = city;
    this.locationChange.emit(this.location);
  }

  onAddressChange(address: string): void {
    this.location.address = address;
    this.locationChange.emit(this.location);
  }

  onStateChange(state: string): void {
    this.location.state = state;
    this.locationChange.emit(this.location);
  }

  get mappedCountries(): SelectableItem[] {
    return this.countries.map((e) => <SelectableItem>{ id: e.id, name: e.name, icon: e.emoji });
  }
}
