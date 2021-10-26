import { DataService } from '../../../@shared/services/data.service';
import { Observable, forkJoin, Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { NgForm } from '@angular/forms';
import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../../../@shared/models/country';
import { Recordlabel } from '../../../@shared/models/recordlabel';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { LabelService } from '../label.service';

@UntilDestroy()
@Component({
  selector: 'app-label-details',
  templateUrl: './label-details.component.html',
  styleUrls: ['./label-details.component.scss'],
})
export class LabelDetailsComponent implements OnInit {
  label: Recordlabel = new Recordlabel();
  countries: Observable<ISelectableItem[]>;
  fullCountries: Observable<Country[]>;

  constructor(
    private labelService: LabelService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.countries = this.dataService.countries;
    this.fullCountries = this.dataService.fullCountries;

    if (id) {
      this.labelService
        .getById(id)
        .pipe(untilDestroyed(this))
        .subscribe((res) => {
          this.label = res || new Recordlabel();
        });
    }
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
            this.notifierService.notify('success', 'Sello Discografico actualizado con exito.');
          });
      } else {
        this.labelService
          .create(this.label)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.notifierService.notify('success', 'Sello Discografico creado con exito');
            this.router.navigate(['labels']);
          });
      }
    }
  }
}
