import { Direction } from 'angular-coordinates';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { VenueService } from '../venue.service';
import { UiService } from '../../../@shared/services/ui.service';
import { DataService } from '../../../@shared/services/data.service';
import { Country } from '../../../@shared/models/country';
import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { NgForm } from '@angular/forms';
import { Venue } from '../../../@shared/models/venue';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { ActivationEnd, ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.scss'],
})
export class VenueDetailsComponent implements OnInit {
  venue: Venue = new Venue();
  countries: Country[] = [];
  venueTypes$: Observable<ISelectableItem[]>;

  direction = Direction;

  constructor(
    private dataService: DataService,
    private uiService: UiService,
    private venueService: VenueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    const req: Observable<any>[] = [];

    this.venueTypes$ = this.dataService.venueTypes;

    req.push(this.venueService.countries);
    if (id) {
      req.push(this.venueService.getById(id));
    }

    forkJoin(req)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.countries = res[0] || [];
        if (id) {
          this.venue = res[1] || new Venue();
        }
      });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      if (this.venue.id) {
        this.venueService
          .update(this.venue)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Venue actualizado con exito.');
          });
      } else {
        this.venueService
          .create(this.venue)
          .pipe(untilDestroyed(this))
          .subscribe((res) => {
            this.uiService.notifySuccess('Venue creado con exito.');
            this.router.navigate(['venues', res]);
          });
      }
    }
  }
}