import { finalize } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { NgForm } from '@angular/forms';
import { ISelectableItem } from './../../@shared/models/selectable-item';
import { Album } from './../../@shared/models/albums';
import { forkJoin, Observable } from 'rxjs';
import { SelectorService } from '@app/@shared/services/selector.service';
import { UiService } from './../../@shared/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsService } from './../albums.service';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';

@UntilDestroy()
@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
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
    private selector: SelectorService,
    private notifierService: NotifierService
  ) { }

  ngOnInit() {
    this.uiService.showLoading();
    this.route.params.pipe(
      untilDestroyed(this))
      .subscribe(params => {
        if (params.id) {
          this.albumService.getById(params.id).pipe(
            untilDestroyed(this)
          ).subscribe(res => {
            this.album = res || new Album();
          })
        }

        forkJoin([this.selector.recordLabels, this.selector.artists, this.selector.organizations])
          .pipe(
            untilDestroyed(this),
            finalize(() => this.uiService.hideLoading())
          )
          .subscribe(res => {
          this.recordLabels = res[0] || [];
          this.artists = res[1] || [];
          this.organizations = res[2] || [];
        })
      })
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      this.uiService.showLoading();
      if (this.album.id) {
        this.albumService.update(this.album).pipe(
          untilDestroyed(this),
          finalize(() => this.uiService.hideLoading())
        ).subscribe(() => {
          this.notifierService.notify('success', 'Album actualizado con exito.');
        })
      } else {
        this.albumService.create(this.album).pipe(
          untilDestroyed(this),
          finalize(() => this.uiService.hideLoading())
        ).subscribe(() => {
          this.notifierService.notify('success', 'Album creado con exito.')
          this.router.navigate(['albums']);
        });
      }
    }
  }

}
