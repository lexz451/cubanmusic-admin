import { SelectorService } from './../../@shared/services/selector.service';
import { Observable, forkJoin } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { NgForm } from '@angular/forms';
import { ISelectableItem } from './../../@shared/models/selectable-item';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from './../../@shared/models/country';
import { Recordlabel } from './../../@shared/models/recordlabel';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  countries: Country[] = [];

  constructor(
    private labelService: LabelService,
    private selectorService: SelectorService,
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    const req: Observable<any>[] = [];
    req.push(this.labelService.countries);

    if (id) {
      req.push(this.labelService.getById(id));
    }

    forkJoin(req)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.countries = res[0] || [];
        if (id) {
          this.label = res[1] || new Recordlabel();
        }
      });
  }

  get mappedCountries(): ISelectableItem[] {
    return this.countries.map((e) => {
      return {
        id: e.id,
        name: e.name,
        icon: e.emoji,
      };
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
