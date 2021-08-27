import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { Artist } from '@app/@shared/models/artist';
import { ISelectableItem } from '@app/@shared/models/selectable-item';
import { SelectorService } from '@app/@shared/services/selector.service';
import { forkJoin } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private artistService: ArtistsService,
    private notifierService: NotifierService,
    private uiService: UiService,
    private cdRef: ChangeDetectorRef
  ) {}

  get genders(): ISelectableItem[] {
    return this.selector.genders;
  }

  ngOnInit() {
    this.uiService.showLoading();

    this.route.params.pipe(untilDestroyed(this)).subscribe((params) => {
      if (params.id) {
        this.artistService
          .getById(params.id)
          .pipe(untilDestroyed(this))
          .subscribe((artist) => {
            this.artist = artist;
            this.cdRef.detectChanges();
          });
      }
    });

    forkJoin([
      this.selector.countries,
      this.selector.organizations,
      this.selector.awards,
      this.selector.instruments,
      this.selector.genres,
      this.selector.jobTitles,
      this.selector.recordLabels,
      this.selector.artists,
    ])
      .pipe(
        untilDestroyed(this),
        finalize(() => this.uiService.hideLoading())
      )
      .subscribe((res) => {
        this.countries = res[0] || [];
        this.organizations = res[1] || [];
        this.awards = res[2] || [];
        this.instruments = res[3] || [];
        this.genres = res[4] || [];
        this.jobTitles = res[5] || [];
        this.recordLabels = res[6] || [];
        this.artists = res[7] || [];
        if (this.artist.id) {
          this.artists = this.artists.filter((a) => a.id !== this.artist.id);
        }
        this.cdRef.detectChanges();
      });
  }

  onSubmit(form: NgForm) {
    console.log('OnSubmit');
    if (form.invalid) {
      form.control.markAllAsTouched();
    }
    if (this.artist.id) {
      this.artistService.updateArtist(this.artist).subscribe(() => {
        this.notifierService.notify('success', 'Artista actualizado con éxito.');
      });
    }
  }
}
