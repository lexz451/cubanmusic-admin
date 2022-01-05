import { DialogService } from './../../_dialogs/dialog.service';
import { CreateRecordlabelComponent } from './../../_dialogs/create-recordlabel/create-recordlabel.component';
import { CreateCountryComponent } from './../../_dialogs/create-country/create-country.component';
import { CreateArtistComponent } from './../../_dialogs/create-artist/create-artist.component';
import { Artist } from './../../../@shared/models/artist';
import { ImageFile } from './../../../@shared/models/image-file';
import { concatMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Group } from '@shared/models/group';
import { ISelectableItem } from '@shared/models/selectable-item';
import { DataService } from '@app/@shared/services/data.service';
import { UiService } from '@shared/services/ui.service';
import { NgForm } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Recordlabel } from '@app/@shared/models/recordlabel';
import { Country } from '@app/@shared/models/country';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Album } from '@app/@shared/models/album';
import { Genre } from '@app/@shared/models/genre';
import { Award } from '@app/@shared/models/award';
import { Logger } from '@app/@shared/logger.service';

const log = new Logger('group');

@UntilDestroy()
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  group: Group = new Group();

  albums: ISelectableItem[];
  genres: ISelectableItem[];
  awards: ISelectableItem[];
  organizations: ISelectableItem[];
  recordLabels: ISelectableItem[];
  artists: ISelectableItem[];

  @ViewChild('input', { static: false })
  fileInput: ElementRef<HTMLInputElement> | undefined;

  defaultThumbnail: any = '/assets/default-image.jpg';

  groupImage?: string;


  constructor(
    private dialogService: DialogService,
    private uiService: UiService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal
  ) {}

  get genders() {
    return this.groupService.genders;
  }

  get currentFragment() {
    return this.route.fragment;
  }

  get isEditMode() {
    return this.group.id!!;
  }

  ngOnInit(): void {
    const { data } = this.route.snapshot.data;

    this.albums = data[0] || [];
    this.awards = data[1] || [];
    this.genres = data[2] || [];
    this.recordLabels = data[3] || [];
    this.artists = data[4] || [];
    this.organizations = data[5] || [];
    this.group = new Group(data[6]);
    if (this.group.imageFile) {
      this.groupImage = ImageFile.toDataURL(this.group.imageFile);
    }
  }

  createRecordLabel(): void {
    this.dialogService
      .showRecordLabelDialog()
      .pipe(
        untilDestroyed(this),
        tap((res) => (this.group.recordLabelId = res)),
        concatMap(() => this.groupService.recordLabels$)
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
        tap(res => this.group.organizationId = res),
        concatMap(() => this.groupService.organizations$)
      ).subscribe(res => {
        this.organizations = res || [];
        this.uiService.notifySuccess('Institución creada con éxito.');
      })
  }

  createGenre(): void {
    this.dialogService
      .showGenreDialog()
      .pipe(
        untilDestroyed(this),
        tap((res) => this.group.genresIds.push(res)),
        concatMap(() => this.groupService.genres$)
      )
      .subscribe((res) => {
        this.genres = res;
        this.uiService.notifySuccess('Género musical creado con éxito.');
      });
  }

  createAward(): void {
    this.dialogService
      .showAwardDialog()
      .pipe(
        untilDestroyed(this),
        tap((res) => this.group.awardsIds?.push(res)),
        concatMap(() => this.groupService.awards$)
      )
      .subscribe((res) => {
        this.awards = res;
        this.uiService.notifySuccess('Premio creado con éxito.');
      });
  }

  createAlbum(): void {
    this.dialogService
      .showAlbumDialog()
      .pipe(
        untilDestroyed(this),
        tap((res) => this.group.albumsIds.push(res)),
        concatMap(() => this.groupService.albums$)
      )
      .subscribe((res) => {
        this.albums = res || [];
        this.uiService.notifySuccess('Album creado con éxito.');
      });
  }

  createArtist(): void {
    this.dialogService
      .showArtistDialog()
      .pipe(
        untilDestroyed(this),
        tap((res) => this.group.membersIds.push(res)),
        concatMap(() => this.groupService.artists$)
      )
      .subscribe((res) => {
        this.artists = res || [];
        this.uiService.notifySuccess('Artista creado con éxito.');
      });
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
      this.group.imageFile = image;
      this.groupImage = ImageFile.toDataURL(this.group.imageFile);
    };
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      log.debug('Invalid form: ' + form.controls.errors);
    } else {
      if (this.group.id) {
        this.groupService
          .update(this.group)
          .pipe(untilDestroyed(this))
          .subscribe((res) => {
            this.uiService.notifySuccess('Grupo actualizado con éxito.');
          });
      } else {
        this.groupService
          .create(this.group)
          .pipe(untilDestroyed(this))
          .subscribe((res) => {
            this.router.navigate(['groups', res]).then(() => this.uiService.notifySuccess('Grupo creado con éxito.'));
          });
      }
    }
  }

  formatISNI(isni: string): string {
    return isni?.trim()?.replace(/ /g, '');
  }
}
