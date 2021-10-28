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
import { Component, OnInit, Optional } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { Recordlabel } from '@app/@shared/models/recordlabel';
import { Country } from '@app/@shared/models/country';

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

  recordLabels$: Observable<ISelectableItem[]>;
  artists$: Observable<ISelectableItem[]>;
  organizations$: Observable<ISelectableItem[]>;
  fullCountries$: Observable<Country[]>;
  countries$: Observable<ISelectableItem[]>;

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
}
