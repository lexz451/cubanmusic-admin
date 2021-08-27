import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { VenueService } from './../venue.service';
import { UiService } from './../../@shared/services/ui.service';
import { SelectorService } from './../../@shared/services/selector.service';
import { Country } from './../../@shared/models/country';
import { ISelectableItem } from './../../@shared/models/selectable-item';
import { NgForm } from '@angular/forms';
import { Venue } from './../../@shared/models/venue';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { ActivationEnd, ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.scss']
})
export class VenueDetailsComponent implements OnInit {

  venue: Venue = new Venue();

  countries: Country[] = [];
  venueTypes: ISelectableItem[] = [];

  constructor(
    private selector: SelectorService,
    private uiService: UiService,
    private venueService: VenueService,
    private notifierService: NotifierService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.pipe(untilDestroyed(this))
      .subscribe(params => {
        if (params.id) {
          this.venueService.getById(params.id).pipe(
            untilDestroyed(this))
            .subscribe(res => {
              this.venue = res || new Venue();
            })
        }

        forkJoin([this.venueService.countries, this.selector.venueTypes])
        .pipe(
          untilDestroyed(this),
          finalize(() => this.uiService.hideLoading())
        )
        .subscribe(res => {
          this.countries = res[0] || [];
          this.venueTypes = res[1] || [];
        })

      });

  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched()
    } else {
      this.uiService.showLoading();
      if (this.venue.id) {
        this.venueService.updateVenue(this.venue).pipe(
          untilDestroyed(this),
          finalize(() => this.uiService.hideLoading())
        ).subscribe(() => {
          this.notifierService.notify('success', 'Venue actualizado con exito');
        })
      } else {
        this.venueService.createVenue(this.venue).pipe(
          untilDestroyed(this),
          finalize(() => this.uiService.hideLoading())
        ).subscribe(() => {
          this.notifierService.notify('success', 'Venue creado con exito.');
          this.router.navigate(['venues']);
        })
      }
    }
  }
}
