import { RouteReusableStrategy } from '../../../@shared/route-reusable-strategy';
import { Genre } from '../../../@shared/models/genre';
import { Country } from '../../../@shared/models/country';
import { Recordlabel } from '../../../@shared/models/recordlabel';
import { Album } from '../../../@shared/models/album';
import { Instrument } from '../../../@shared/models/instrument';
import { JobTitle } from '../../../@shared/models/job-title';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@shared/models/image';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { Artist } from '@app/@shared/models/artist';
import { ISelectableItem } from '@app/@shared/models/selectable-item';
import { DataService } from '@app/@shared/services/data.service';
import { Observable } from 'rxjs';
import { ArtistsService } from '@app/modules/artists/artists.service';
import { UiService } from '@shared/services/ui.service';
import { finalize, map, share } from 'rxjs/operators';
import { Location } from '@shared/models/location';
import { ImagesService } from '@app/@shared/services/images.service';
import { Award } from '@app/@shared/models/award';
import { Organization } from '@app/@shared/models/organization';

@UntilDestroy()
@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css'],
})
export class ArtistDetailsComponent implements OnInit {
  artist = new Artist();

  jobTitle: JobTitle = new JobTitle();
  instrument: Instrument = new Instrument();
  location = new Location();
  album = new Album();
  award = new Award();
  label = new Recordlabel();
  genre = new Genre();
  country = new Country();

  locations$: Observable<ISelectableItem[]>;
  jobTitles$: Observable<ISelectableItem[]>;
  albums$: Observable<ISelectableItem[]>;
  awards$: Observable<Award[]>;
  organizations$: Observable<Organization[]>;
  genres$: Observable<ISelectableItem[]>;
  instruments$: Observable<ISelectableItem[]>;
  artists$: Observable<ISelectableItem[]>;
  recordLabels$: Observable<ISelectableItem[]>;
  countries$: Observable<ISelectableItem[]>;
  fullCountries$: Observable<Country[]>;

  artistImages$: Observable<Image[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    private datePipe: DatePipe,
    //
    private dataService: DataService,
    private artistService: ArtistsService,
    private uiService: UiService,
    private imagesService: ImagesService
  ) {}

  get genders(): ISelectableItem[] {
    return this.dataService.genders;
  }

  get currentFragment() {
    return this.route.fragment;
  }

  get isEditMode(): boolean {
    return !!this.artist.id;
  }

  ngOnInit() {
    this.locations$ = this.dataService.locations;
    this.jobTitles$ = this.dataService.jobTitles;
    this.albums$ = this.dataService.albums;
    this.awards$ = this.dataService.awards;
    this.instruments$ = this.dataService.instruments;
    this.genres$ = this.dataService.genres;
    this.artists$ = this.dataService.artists;
    this.recordLabels$ = this.dataService.recordLabels;
    this.countries$ = this.dataService.countries;
    this.fullCountries$ = this.dataService.fullCountries;

    const id = this.route.snapshot.params.id;
    if (id) {
      this.artistService
        .getById(id)
        .pipe(untilDestroyed(this))
        .subscribe((res) => {
          this.artist = res;
          this.artists$ = this.dataService.artists.pipe(
            map((artists) => artists.filter((artist) => artist.id !== this.artist.id))
          );
        });
      this.artistImages$ = this.imagesService.getArtistImages(id).pipe(untilDestroyed(this));
    }
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
          .subscribe((res) => {
            this.uiService.notifySuccess('Artista creado con éxito.');
            this.router.navigate(['artists', res]);
          });
      }
    }
  }

  uploadArtistImage(image: Image) {
    this.imagesService
      .uploadImage(this.artist.id, image)
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.artistImages$ = this.imagesService.getArtistImages(this.artist.id).pipe(untilDestroyed(this));
        this.uiService.notifySuccess('Imagen creada con éxito.');
      });
  }

  deleteArtistImage(id: number): void {
    this.imagesService
      .deleteImage(id)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.artistImages$ = this.imagesService.getArtistImages(this.artist.id).pipe(untilDestroyed(this));
        this.uiService.notifySuccess('Imagen eliminada con éxito.');
      });
  }

  createBirthPlace(locationModal: any): void {
    this.location = new Location();
    this.modal
      .open(locationModal, {
        centered: true,
        size: 'lg',
      })
      .result.then(
        () => {
          this.dataService
            .createLocation(this.location)
            .pipe(untilDestroyed(this))
            .subscribe((id) => {
              this.uiService.notifySuccess('Ubicación creada con éxito.');
              this.artist.birthPlace = id;
              this.locations$ = this.dataService.locations;
            });
        },
        () => {}
      );
  }

  createDeathPlace(locationModal: any): void {
    this.location = new Location();
    this.modal
      .open(locationModal, {
        centered: true,
        size: 'lg',
      })
      .result.then(
        () => {
          this.dataService
            .createLocation(this.location)
            .pipe(untilDestroyed(this))
            .subscribe((id) => {
              this.uiService.notifySuccess('Ubicación creada con éxito.');
              this.artist.deathPlace = id;
              this.locations$ = this.dataService.locations;
            });
        },
        () => {}
      );
  }

  createResidencePlace(locationModal: any): void {
    this.location = new Location();
    this.modal
      .open(locationModal, {
        centered: true,
        size: 'lg',
      })
      .result.then(
        () => {
          this.dataService
            .createLocation(this.location)
            .pipe(untilDestroyed(this))
            .subscribe((id) => {
              this.uiService.notifySuccess('Ubicación creada con éxito.');
              this.artist.residencePlace = id;
              this.locations$ = this.dataService.locations;
            });
        },
        () => {}
      );
  }

  createAward(awardModal: any): void {
    this.award = new Award();
    this.modal
      .open(awardModal, {
        size: 'xl',
        centered: true,
        backdrop: 'static',
      })
      .result.then(
        () => {
          this.dataService
            .createAward(this.award)
            .pipe(untilDestroyed(this))
            .subscribe((res) => {
              this.artist.awards?.push(res);
              this.awards$ = this.dataService.awards;
              this.uiService.notifySuccess('Premio creado con éxito.');
            });
        },
        () => {}
      );
  }

  createAlbum(albumModal: any): void {
    this.album = new Album();
    this.modal
      .open(albumModal, {
        size: 'xl',
        centered: true,
        backdrop: 'static',
      })
      .result.then(
        () => {
          this.dataService
            .createAlbum(this.album)
            .pipe(untilDestroyed(this))
            .subscribe((res) => {
              this.artist.albums?.push(res);
              this.albums$ = this.dataService.albums;
              this.uiService.notifySuccess('Album creado con éxito.');
            });
        },
        () => {}
      );
  }

  onDoneAlbumModal(modal: any, form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      modal.close('accept');
    }
  }

  createJobTitle(jobTitleModal: any): void {
    this.jobTitle = new JobTitle();
    this.modal
      .open(jobTitleModal, {
        centered: true,
        size: 'md',
      })
      .result.then(
        () => {
          this.dataService
            .createJobTitle(this.jobTitle)
            .pipe(untilDestroyed(this))
            .subscribe((id) => {
              this.jobTitles$ = this.dataService.jobTitles;
              this.artist.jobTitle = id;
              this.uiService.notifySuccess('Ocupación creada con éxito.');
            });
        },
        () => {}
      );
  }

  createGenre(genreModal: any): void {
    this.genre = new Genre();
    this.modal
      .open(genreModal, {
        centered: true,
        size: 'md',
      })
      .result.then(
        () => {
          this.dataService
            .createGenre(this.genre)
            .pipe(untilDestroyed(this))
            .subscribe((id) => {
              this.genres$ = this.dataService.genres;
              this.artist.genres.push(id);
              this.uiService.notifySuccess('Género creado con éxito.');
            });
        },
        () => {}
      );
  }

  createRecordLabel(recordLabelModal: any): void {
    this.label = new Recordlabel();
    this.modal
      .open(recordLabelModal, {
        size: 'md',
        centered: true,
      })
      .result.then(
        () => {
          this.dataService
            .createRecordLabel(this.label)
            .pipe(untilDestroyed(this))
            .subscribe((res) => {
              this.artist.label = res;
              this.recordLabels$ = this.dataService.recordLabels;
              this.uiService.notifySuccess('Sello creado con éxito.');
            });
        },
        () => {}
      );
  }

  createInstrument(instrumentModal: any): void {
    this.instrument = new Instrument();
    this.modal
      .open(instrumentModal, {
        centered: true,
        size: 'md',
      })
      .result.then(
        () => {
          this.dataService
            .createInstrument(this.instrument)
            .pipe(untilDestroyed(this))
            .subscribe((res) => {
              this.artist.instruments?.push(res);
              this.instruments$ = this.dataService.instruments;
              this.uiService.notifySuccess('Instrumento creado con éxito.');
            });
        },
        () => {}
      );
  }

  createCountry(countryModal: any): void {
    this.country = new Country();
    this.modal
      .open(countryModal, {
        centered: true,
        size: 'md',
      })
      .result.then(
        () => {
          this.dataService
            .createCountry(this.country)
            .pipe(untilDestroyed(this))
            .subscribe((res) => {
              this.countries$ = this.dataService.countries;
              this.uiService.notifySuccess('País agregado con éxito.');
            });
        },
        () => {}
      );
  }

  onAddCountry(form: NgForm, modal: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      modal.close('accept');
    }
  }

  formatISNI(isni: string): string {
    return isni?.trim()?.replace(/ /g, '');
  }
}
