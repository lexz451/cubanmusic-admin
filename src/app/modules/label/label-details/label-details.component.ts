import { NotifierService } from 'angular-notifier';
import { NgForm } from '@angular/forms';
import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { ActivatedRoute, Router } from '@angular/router';
import { Recordlabel } from '../../../@shared/models/recordlabel';
import { Component, OnInit } from '@angular/core';
import { LabelService } from '../label.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DialogService } from '@app/modules/_dialogs/dialog.service';
import { concatMap, tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-label-details',
  templateUrl: './label-details.component.html',
  styleUrls: ['./label-details.component.scss'],
})
export class LabelDetailsComponent implements OnInit {
  label: Recordlabel = new Recordlabel();
  countries: ISelectableItem[] = [];

  constructor(
    private labelService: LabelService,
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    const { data } = this.route.snapshot.data;
    this.countries = data[0] || [];
    this.label = data[1] || new Recordlabel();
  }

  createCountry() {
    this.dialogService
      .showCountryDialog()
      .pipe(
        untilDestroyed(this),
        tap(res => this.label.countryId = res),
        concatMap(() => this.labelService.countries)
      )
      .subscribe((res) => {
        this.countries = res || [];
      });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      if (this.label.id) {
        this.labelService
          .update(this.label)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.notifierService.notify('success', 'Sello Discográfico actualizado con éxito.');
          });
      } else {
        this.labelService
          .create(this.label)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.router.navigate(['labels']).then(() => {
              this.notifierService.notify('success', 'Sello Discográfico creado con éxito');
            });
          });
      }
    }
  }
}
