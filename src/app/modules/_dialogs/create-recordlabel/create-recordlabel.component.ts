import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { switchMap, concatMap, tap } from 'rxjs/operators';
import { Country } from './../../../@shared/models/country';
import { CreateCountryComponent } from './../create-country/create-country.component';
import { Recordlabel } from './../../../@shared/models/recordlabel';
import { Component, Inject, INJECTOR, Injector } from '@angular/core';
import { DialogComponent } from '../dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-create-recordlabel',
  templateUrl: './create-recordlabel.component.html',
  styleUrls: ['./create-recordlabel.component.scss'],
})
export class CreateRecordlabelComponent extends DialogComponent<Recordlabel> {
  constructor(@Inject(INJECTOR) injector: Injector) {
    super(injector);
  }

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
