import { switchMap, finalize } from 'rxjs/operators';
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
import { forkJoin, Observable, of, EMPTY } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ImageFile } from '@app/@shared/models/image-file';

@UntilDestroy()
@Component({
  selector: 'app-venue-details',
  templateUrl: './venue-details.component.html',
  styleUrls: ['./venue-details.component.scss'],
})
export class VenueDetailsComponent implements OnInit {
  venue: Venue = new Venue();
  countries: Country[] = [];
  venueTypes: ISelectableItem[];

  direction = Direction;

  defaultThumbnail: any = '/assets/default-image.jpg';

  venueImage?: string;

  @ViewChild('input', { static: false })
  fileInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private dataService: DataService,
    private uiService: UiService,
    private venueService: VenueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const { data } = this.route.snapshot.data;

    this.venueTypes = data[0] || [];
    this.countries = data[1] || [];
    this.venue = data[2] || new Venue();
    if (this.venue.imageFile) {
      this.venueImage = ImageFile.toDataURL(this.venue.imageFile);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      if (this.venue.id) {
        this.venueService
          .update(this.venue)
          .pipe(untilDestroyed(this))
          .subscribe((res) => {
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
    let reader = new FileReader();
    let file = this.fileInput?.nativeElement.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      let image = new ImageFile();
      image.filename = file.name;
      image.filetype = file.type;
      image.filedata = ImageFile.toBase64(reader.result as string);
      this.venue.imageFile = image;
      this.venueImage = ImageFile.toDataURL(this.venue.imageFile);
    };
  }
}
