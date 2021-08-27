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
  styleUrls: ['./label-details.component.scss']
})
export class LabelDetailsComponent implements OnInit {

  label: Recordlabel = new Recordlabel();
  countries: Country[] = [];

  constructor(
    private labelService: LabelService,
    private router: Router,
    private route: ActivatedRoute,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params.id) {
        this.labelService.getById(params.id).pipe(untilDestroyed(this))
          .subscribe(res => {
            this.label = res || new Recordlabel();
          })
      }
    })

    this.labelService.countries.pipe(untilDestroyed(this))
      .subscribe(res => {
        this.countries = res || [];
      })
  }

  get mappedCountries(): ISelectableItem[] {
    return this.countries.map(e => {
      return {
        id: e.id,
        name: e.name,
        icon: e.emoji
      }
    })
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      if (this.label.id) {
        this.labelService.updateLabel(this.label).pipe(untilDestroyed(this))
          .subscribe(() => {
            this.notifierService.notify('success', 'Sello Discografico actualizado con exito.');
          })
      } else  {
        this.labelService.createLabel(this.label).pipe(untilDestroyed(this))
          .subscribe(() => {
            this.notifierService.notify('success', 'Sello Discografico creado con exito');
            this.router.navigate(['labels']);
          })
      }
    }
  }
}
