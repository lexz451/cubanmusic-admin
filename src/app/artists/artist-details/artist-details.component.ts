import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { Artist } from '@app/@shared/models/artist';
import { ISelectableItem } from '@app/@shared/models/selectable-item';
import { SelectorService } from '@app/@shared/services/selector.service';
import { forkJoin, Observable } from 'rxjs';
import { ArtistsService } from '@app/artists/artists.service';
import { UiService } from '@shared/services/ui.service';
import { finalize } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { Location } from '@shared/models/location';

@UntilDestroy()
@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css'],
})
export class ArtistDetailsComponent implements OnInit {
  artist = new Artist();

  countries: ISelectableItem[] = [];
  awards: ISelectableItem[] = [];
  organizations: ISelectableItem[] = [];
  instruments: ISelectableItem[] = [];
  genres: ISelectableItem[] = [];
  jobTitles: ISelectableItem[] = [];
  recordLabels: ISelectableItem[] = [];
  artists: ISelectableItem[] = [];

  constructor(
    private selector: SelectorService,
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistsService,
    private uiService: UiService
  ) {}

  get genders(): ISelectableItem[] {
    return this.selector.genders;
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    const req: Observable<any>[] = [];
    req.push(
      this.selector.countries,
      this.selector.organizations,
      this.selector.awards,
      this.selector.instruments,
      this.selector.genres,
      this.selector.jobTitles,
      this.selector.recordLabels,
      this.selector.artists
    );

    if (id) {
      req.push(this.artistService.getById(id));
    }

    forkJoin(req)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.countries = res[0] || [];
        this.organizations = res[1] || [];
        this.awards = res[2] || [];
        this.instruments = res[3] || [];
        this.genres = res[4] || [];
        this.jobTitles = res[5] || [];
        this.recordLabels = res[6] || [];
        this.artists = res[7] || [];
        if (id) {
          this.artist = res[8] || new Artist();
          if (this.artist.id) {
            this.artists = this.artists.filter((a) => a.id !== this.artist.id);
          }
        }
      });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      if (this.artist.id) {
        this.artistService
          .updateArtist(this.artist)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Artista actualizado con éxito.');
          });
      } else {
        this.artistService
          .createArtist(this.artist)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Artista creado con exito.');
            this.router.navigate(['artists']);
          });
      }
    }
  }
}
