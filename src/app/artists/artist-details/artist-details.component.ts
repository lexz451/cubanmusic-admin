import { DataService } from './../../@core/data.service';
import { Artist } from './../../@core/model/artist';
import { Component, OnInit } from '@angular/core';
import { Country } from '@app/@core/model/country';
import { Observable } from 'rxjs';
import { Location } from '@app/@core/model/location';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
})
export class ArtistDetailsComponent implements OnInit {
  artist?: Artist = new Artist();
  countries: Country[] = [];
  mode: 'create' | 'edit' = 'create';

  constructor(private _dataService: DataService) {}

  get genderSelectors(): any[] {
    return this._dataService.genderSelectors;
  }

  ngOnInit() {
    this._dataService.countries.subscribe((res) => {
      if (res && res.length) {
        this.countries = res;
      }
    });
  }
}
