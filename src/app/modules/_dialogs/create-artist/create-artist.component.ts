import { DialogComponent } from './../dialog.component';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Artist } from './../../../@shared/models/artist';
import { Component } from '@angular/core';

@UntilDestroy()
@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.scss'],
})
export class CreateArtistComponent extends DialogComponent<Artist> {
  createBirthPlace(): void {
    this.dialogService
      .showLocationDialog()
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.result.birthPlaceId = res;
        this.locations$ = this.dataService.locations$;
      });
  }

  createDeathPlace(): void {
    this.dialogService
      .showLocationDialog()
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.result.deathPlaceId = res;
        this.locations$ = this.dataService.locations$;
      });
  }

  createResidencePlace(): void {
    this.dialogService
      .showLocationDialog()
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.result.residencePlaceId = res;
        this.locations$ = this.dataService.locations$;
      });
  }
}
