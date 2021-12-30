import { ImageFile } from '@app/@shared/models/image-file';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { finalize, concatMap } from 'rxjs/operators';
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

  recordLabels: ISelectableItem[];
  artists: ISelectableItem[];
  organizations: ISelectableItem[];
  countries: ISelectableItem[];

  defaultThumbnail: any = '/assets/default-image.jpg';

  albumImage?: string;

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

    const { data } = this.route.snapshot.data;

    this.recordLabels = data[0] || [];
    this.artists = data[1] || [];
    this.organizations = data[2] || [];
    this.countries = data[3] || [];

    this.album = data[4] || new Album();
    if (this.album.imageFile) {
      this.albumImage = ImageFile.toDataURL(this.album.imageFile);
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
            .pipe(
              untilDestroyed(this),
              concatMap(() => this.dataService.countries)
            )
            .subscribe((res) => {
              this.countries = res || [];
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
            this.router.navigate(['albums']).then(() => this.uiService.notifySuccess('Album creado con éxito.'));
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
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const image = new ImageFile()
      image.filename = file.name;
      image.filetype = file.type;
      image.filedata = ImageFile.toBase64(reader.result as string);
      this.album.imageFile = image;
      this.albumImage = ImageFile.toDataURL(this.album.imageFile);
    };
  }

}
