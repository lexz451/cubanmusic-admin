import { ImageFile } from './../../../@shared/models/image-file';
import { DialogService } from './../../_dialogs/dialog.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '@app/@shared/models/artist';
import { ISelectableItem } from '@app/@shared/models/selectable-item';
import { ArtistsService } from '@app/modules/artist/artist.service';
import { UiService } from '@shared/services/ui.service';
import { tap, concatMap } from 'rxjs/operators';
import { Award } from '@app/@shared/models/award';
import { Organization } from '@app/@shared/models/organization';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css'],
})
export class ArtistDetailsComponent implements OnInit {
  artist = new Artist();

  locations: ISelectableItem[] = [];
  jobTitles: ISelectableItem[] = [];
  albums: ISelectableItem[] = [];
  awards: Award[] = [];
  organizations: Organization[] = [];
  genres: ISelectableItem[] = [];
  instruments: ISelectableItem[] = [];
  artists: ISelectableItem[] = [];
  recordLabels: ISelectableItem[] = [];
  relatedArtists: string[] = [];

  @ViewChild('input', { static: false })
  fileInput: ElementRef<HTMLInputElement> | undefined;

  defaultThumbnail: any = '/assets/default-image.jpg';

  artistImage?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistsService,
    private uiService: UiService,
    private dialogService: DialogService
  ) {}

  get genders(): ISelectableItem[] {
    return this.artistService.genders;
  }

  get currentFragment() {
    return this.route.fragment;
  }

  get isEditMode(): boolean {
    return !!this.artist.id;
  }

  ngOnInit() {
    const { data } = this.route.snapshot.data;

    this.artist = data[0] || new Artist();
    if (this.artist.imageFile) {
      this.artistImage = ImageFile.toDataURL(this.artist.imageFile);
    }

    this.locations = data[1] || [];
    this.jobTitles = data[2] || [];
    this.albums = data[3] || [];
    this.awards = data[4] || [];
    this.organizations = data[5] || [];
    this.genres = data[6] || [];
    this.instruments = data[7] || [];
    const artists = data[8] || [];
    this.artists = artists.filter((e: any) => e.id !== this.artist.id);
    this.recordLabels = data[9] || [];

    this.relatedArtists.push(...this.artists.map(e => e.name));
    this.relatedArtists.push(...this.artist.relatedArtists);
  }

  addImage(): void {
    this.fileInput?.nativeElement?.click();
  }

  onImageChange(): void {
    let file = this.fileInput?.nativeElement.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const image = new ImageFile();
      image.filename = file.name;
      image.filetype = file.type;
      image.filedata = ImageFile.toBase64(reader.result as string);
      this.artist.imageFile = image;
      this.artistImage = ImageFile.toDataURL(this.artist.imageFile);
    };
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      if (this.artist.id) {
        this.artistService
          .update(this.artist)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Artista actualizado con éxito.');
          });
      } else {
        this.artistService
          .create(this.artist)
          .pipe(untilDestroyed(this))
          .subscribe((res) => {
            this.uiService.notifySuccess('Artista creado con éxito.');
            this.router.navigate(['artists', res]);
          });
      }
    }
  }

  createAlbum(): void {
    this.dialogService
      .showAlbumDialog()
      .pipe(
        untilDestroyed(this),
        tap((res) => this.artist.albumsIds.push(res)),
        concatMap(() => this.artistService.albums$)
      )
      .subscribe((res) => {
        this.albums = res || [];
        this.uiService.notifySuccess('Album creado con éxito.');
      });
  }

  createBirthPlace(): void {
    this.dialogService
      .showLocationDialog()
      .pipe(
        untilDestroyed(this),
        tap((bp) => (this.artist.birthPlaceId = bp)),
        concatMap(() => this.artistService.locations$)
      )
      .subscribe((res) => {
        this.locations = res || [];
        this.uiService.notifySuccess('Ubicación creada con éxito.');
      });
  }

  createDeathPlace(): void {
    this.dialogService
      .showLocationDialog()
      .pipe(
        untilDestroyed(this),
        tap((dp) => (this.artist.deathPlaceId = dp)),
        concatMap(() => this.artistService.locations$)
      )
      .subscribe((res) => {
        this.locations = res || [];
        this.uiService.notifySuccess('Ubicación creada con éxito.');
      });
  }

  createResidencePlace(): void {
    this.dialogService
      .showLocationDialog()
      .pipe(
        untilDestroyed(this),
        tap((rp) => (this.artist.residencePlaceId = rp)),
        concatMap(() => this.artistService.locations$)
      )
      .subscribe((res) => {
        this.locations = res || [];
        this.uiService.notifySuccess('Ubicación creada con éxito.');
      });
  }

  createAward(): void {
    this.dialogService
      .showAwardDialog()
      .pipe(
        untilDestroyed(this),
        tap((a) => this.artist.awardsIds = [...this.artist.awardsIds, a]),
        concatMap(() => this.artistService.awards$)
      )
      .subscribe((res) => {
        this.awards = res || [];
        this.uiService.notifySuccess('Premio creado con éxito.');
      });
  }

  createJobTitle(): void {
    this.dialogService
      .showJobTitleDialog()
      .pipe(
        untilDestroyed(this),
        tap((jt) => (this.artist.jobTitleId = jt)),
        concatMap(() => this.artistService.jobTitles$)
      )
      .subscribe((res) => {
        this.jobTitles = res || [];
        this.uiService.notifySuccess('Ocupación creada con éxito.');
      });
  }

  createGenre(): void {
    this.dialogService
      .showGenreDialog()
      .pipe(
        untilDestroyed(this),
        tap((g) => this.artist.genresIds = [...this.artist.genresIds, g]),
        concatMap(() => this.artistService.genres$)
      )
      .subscribe((res) => {
        this.genres = res || [];
        this.uiService.notifySuccess('Género creado con éxito.');
      });
  }

  createRecordLabel(): void {
    this.dialogService
      .showRecordLabelDialog()
      .pipe(
        untilDestroyed(this),
        tap((res) => (this.artist.recordLabelId = res)),
        concatMap(() => this.artistService.recordLabels$)
      )
      .subscribe((res) => {
        this.recordLabels = res;
        this.uiService.notifySuccess('Sello discográfico creado con éxito.');
      });
  }

  createOrganization(): void {
    this.dialogService.showCreateOrganization()
      .pipe(
        untilDestroyed(this),
        tap(res => this.artist.organizationId = res),
        concatMap(() => this.artistService.organizations$)
      ).subscribe(res => {
        this.organizations = res || [];
        this.uiService.notifySuccess('Institución creada con éxito.');
      })
  }

  createInstrument(): void {
    this.dialogService
      .showInstrumentDialog()
      .pipe(
        untilDestroyed(this),
        tap((i) => this.artist.instrumentsIds = [...this.artist.instrumentsIds, i]),
        concatMap(() => this.artistService.instruments$)
      )
      .subscribe((res) => {
        this.instruments = res || [];
        this.uiService.notifySuccess('Instrumento creado con éxito.');
      });
  }

  formatISNI(isni: string): string {
    return isni?.trim()?.replace(/ /g, '');
  }
}
