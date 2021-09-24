import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { NgForm } from '@angular/forms';
import { ISelectableItem } from './../../@shared/models/selectable-item';
import { Album } from './../../@shared/models/albums';
import { forkJoin, Observable } from 'rxjs';
import { DataService } from '@app/@shared/services/data.service';
import { UiService } from './../../@shared/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService } from './../albums.service';
import { Component, OnInit, Optional } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';

@UntilDestroy()
@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
})
export class AlbumDetailsComponent implements OnInit {
  album: Album = new Album();

  recordLabels: ISelectableItem[] = [];
  artists: ISelectableItem[] = [];
  organizations: ISelectableItem[] = [];

  constructor(
    private albumService: AlbumsService,
    private route: ActivatedRoute,
    private router: Router,
    private uiService: UiService,
    private dataService: DataService,
    @Optional()
    private modalRef: NgbActiveModal
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    const req: Observable<any>[] = [];
    req.push(this.dataService.recordLabels);
    req.push(this.dataService.artists);
    req.push(this.dataService.organizations);
    if (id) {
      req.push(this.albumService.getById(id));
    }

    forkJoin(req)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.recordLabels = res[0] || [];
        this.artists = res[1] || [];
        this.organizations = res[2] || [];
        if (id) {
          this.album = res[3] || new Album();
        }
      });
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
            this.uiService.notifySuccess('Album actualizado con exito.');
          });
      } else {
        this.albumService
          .create(this.album)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Album creado con exito.');
            this.router.navigate(['albums']);
          });
      }
    }
  }

  cancelModal(): void {
    this.modalRef?.dismiss();
  }
}
