import { Country } from './../../../@shared/models/country';
import { DialogComponent } from './../dialog.component';
import { NgForm } from '@angular/forms';
import { UiService } from './../../../@shared/services/ui.service';
import { tap, concatMap } from 'rxjs/operators';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { DataService } from '@app/@shared/services/data.service';
import { CreateCountryComponent } from './../create-country/create-country.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Location } from './../../../@shared/models/location';
import { Component, OnInit } from '@angular/core';

@UntilDestroy()
@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss'],
})
export class CreateLocationComponent extends DialogComponent<Location> {
  createCountry() {
    this.dialogService
      .showCountryDialog()
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.result.countryId = res;
        this.countries$ = this.dataService.countries$;
      });
  }
}
