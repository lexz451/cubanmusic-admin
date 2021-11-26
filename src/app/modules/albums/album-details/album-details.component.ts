import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { NgForm } from '@angular/forms';
import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { Album } from '../../../@shared/models/album';
import { forkJoin, Observable } from 'rxjs';
import { DataService } from '@app/@shared/services/data.service';
import { UiService } from '../../../@shared/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService } from '../albums.service';
import { Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';
import { Recordlabel } from '@app/@shared/models/recordlabel';
import { Country } from '@app/@shared/models/country';
import { Image } from '@app/@shared/models/image';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
})
export class AlbumDetailsComponent implements OnInit {
  album: Album = new Album();
  label = new Recordlabel();
  country = new Country();
  image = new Image();

  recordLabels$: Observable<ISelectableItem[]>;
  artists$: Observable<ISelectableItem[]>;
  organizations$: Observable<ISelectableItem[]>;
  fullCountries$: Observable<Country[]>;
  countries$: Observable<ISelectableItem[]>;

  albumArt: any = '/assets/default-image.jpg';

  @ViewChild('input', { static: false })
  fileInput: ElementRef<HTMLInputElement> | undefined;

  constructor(
    private albumService: AlbumsService,
    private route: ActivatedRoute,
    private router: Router,
    private uiService: UiService,
    private dataService: DataService,
    private modal: NgbModal,
    @Optional()
    private modalRef: NgbActiveModal
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    this.recordLabels$ = this.dataService.recordLabels;
    this.artists$ = this.dataService.artists;
    this.organizations$ = this.dataService.organizations;
    this.fullCountries$ = this.dataService.fullCountries;
    this.countries$ = this.dataService.countries;

    if (id) {
      this.albumService
        .getById(id)
        .pipe(untilDestroyed(this))
        .subscribe((res) => {
          this.album = res || new Album();
          if (this.album.image) {
            this.albumArt = this.album.image;
          }
        });
    }
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
              this.recordLabels$ = this.dataService.recordLabels;
              this.uiService.notifySuccess('Sello creado con éxito.');
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

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      if (this.album.id) {
        this.albumService
          .update(this.album)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Album actualizado con éxito.');
          });
      } else {
        this.albumService
          .create(this.album)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Album creado con éxito.');
            this.router.navigate(['albums']);
          });
      }
    }
  }

  cancelModal(): void {
    this.modalRef?.dismiss();
  }

  onChangeContributor() {
    console.log(this.album.contributors);
  }

  addImage(): void {
    this.fileInput?.nativeElement?.click();
  }

  onImageChange(): void {
    let file = this.fileInput?.nativeElement.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      this.album.image = reader.result;
      this.albumArt = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  getImageBase64(e: Image) {
    const base64 = e.filedata;
    const type = e.filetype;
    const img = `data:${type};base64,${base64}`;
    return img;
  }
}
