import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Group } from '@shared/models/group';
import { ISelectableItem } from '@shared/models/selectable-item';
import { forkJoin, Observable } from 'rxjs';
import { Logger, untilDestroyed } from '@shared';
import { finalize, map } from 'rxjs/operators';
import { DataService } from '@app/@shared/services/data.service';
import { UiService } from '@shared/services/ui.service';
import { NgForm } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Image } from '@app/@shared/models/image';
import { Recordlabel } from '@app/@shared/models/recordlabel';
import { Country } from '@app/@shared/models/country';
import { ImagesService } from '@app/@shared/services/images.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Album } from '@app/@shared/models/albums';
import { Genre } from '@app/@shared/models/genre';
import { Award } from '@app/@shared/models/award';

const log = new Logger("group");

@UntilDestroy()
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  group: Group = new Group();

  label = new Recordlabel();
  album = new Album();
  genre = new Genre();
  award = new Award();

  albums$: Observable<ISelectableItem[]>;
  genres$: Observable<ISelectableItem[]>;
  awards$: Observable<ISelectableItem[]>;
  organizations$: Observable<ISelectableItem[]>;
  recordLabels$: Observable<ISelectableItem[]>;
  countries$: Observable<ISelectableItem[]>;
  fullCountries$: Observable<Country[]>;
  artists$: Observable<ISelectableItem[]>;

  groupImages$: Observable<Image[]>;

  constructor(
    private dataService: DataService,
    private uiService: UiService,
    private groupService: GroupService,
    private imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) {}

  get currentFragment() {
    return this.route.fragment;
  }

  get isEditMode() {
    return this.group.id!!;
  }

  ngOnInit(): void {
    this.albums$ = this.dataService.albums;
    this.awards$ = this.dataService.awards;
    this.genres$ = this.dataService.genres;
    this.artists$ = this.dataService.artists;
    this.recordLabels$ = this.dataService.recordLabels;
    this.countries$ = this.dataService.countries;
    this.fullCountries$ = this.dataService.fullCountries;

    const id = this.route.snapshot.params.id;
    if (id) {
      this.groupService
        .getById(id)
        .pipe(untilDestroyed(this))
        .subscribe((res) => {
          this.group = res;
        });
      this.groupImages$ = this.imagesService.getArtistImages(id).pipe(untilDestroyed(this));
    }
  }

  uploadArtistImage(image: Image) {
    this.imagesService
      .uploadImage(this.group.id, image)
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.groupImages$ = this.imagesService.getArtistImages(this.group.id).pipe(untilDestroyed(this));
        this.uiService.notifySuccess('Imagen creada con exito.');
      });
  }

  deleteArtistImage(id: number): void {
    this.imagesService
      .deleteImage(id)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.groupImages$ = this.imagesService.getArtistImages(this.group.id).pipe(untilDestroyed(this));
        this.uiService.notifySuccess('Imagen eliminada con exito.');
      });
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
              this.group.label = res;
              this.recordLabels$ = this.dataService.recordLabels;
              this.uiService.notifySuccess('Sello creado con exito.');
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
              this.group.genres.push(id);
              this.uiService.notifySuccess('Genero creado con exito.');
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
              this.group.albums?.push(res);
              this.albums$ = this.dataService.albums;
              this.uiService.notifySuccess('Album creado con exito.');
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
              this.group.awards?.push(res);
              this.awards$ = this.dataService.awards;
              this.uiService.notifySuccess('Premio creado con exito.');
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

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      log.debug("Invalid form: " + form.controls.errors);
    } else {
      if (this.group.id) {
        this.groupService.updateGroup(this.group)
          .pipe(
            untilDestroyed(this)
          ).subscribe(res => {
            this.uiService.notifySuccess('Grupo actualizado con éxito.');
          })
      } else {
        this.groupService.createGroup(this.group)
          .pipe(
            untilDestroyed(this)
          ).subscribe(res => {
            this.uiService.notifySuccess('Grupo creado con éxito.');
            this.router.navigate(['groups', res]);
          })
      }
    }
  }
}
