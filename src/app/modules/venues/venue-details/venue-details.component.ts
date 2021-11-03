import { Direction } from 'angular-coordinates';
import { VenueService } from '../venue.service';
import { UiService } from '../../../@shared/services/ui.service';
import { DataService } from '../../../@shared/services/data.service';
import { Country } from '../../../@shared/models/country';
import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { NgForm } from '@angular/forms';
import { Venue } from '../../../@shared/models/venue';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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

  venueImg: any = "/assets/default-image.jpg";

  @ViewChild("input", { static: false })
  fileInput: ElementRef<HTMLInputElement> | undefined;

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
          if (this.venue.image) {
            this.venueImg = this.venue.image;
          }
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
            this.uiService.notifySuccess('Venue actualizado con éxito.');
          });
      } else {
        this.venueService
          .create(this.venue)
          .pipe(untilDestroyed(this))
          .subscribe((res) => {
            this.uiService.notifySuccess('Venue creado con éxito.');
            this.router.navigate(['venues', res]);
          });
      }
    }
  }

  addImage(): void {
    this.fileInput?.nativeElement?.click();
  }

  onImageChange(): void {
    let file = this.fileInput?.nativeElement.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      this.venue.image = reader.result;
      this.venueImg = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file);
    }

  }
}
