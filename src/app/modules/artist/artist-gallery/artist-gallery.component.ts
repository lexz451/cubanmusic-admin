import { concatMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Image } from './../../../@shared/models/image';
import { Artist } from './../../../@shared/models/artist';
import { Component, OnInit, Input } from '@angular/core';
import { ArtistsService } from '../artist.service';

@UntilDestroy()
@Component({
  selector: 'app-artist-gallery',
  templateUrl: './artist-gallery.component.html',
  styleUrls: ['./artist-gallery.component.scss'],
})
export class ArtistGalleryComponent implements OnInit {
  @Input() artist: Artist;

  images: Image[] = [];

  constructor(private artistService: ArtistsService) {}

  ngOnInit() {
    this.artistService
      .getImages(this.artist.id)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.images = res || [];
      });
  }

  deleteArtistImage(id: string): void {
    this.artistService
      .deleteImage(id)
      .pipe(
        untilDestroyed(this),
        concatMap(() => this.artistService.getImages(this.artist.id))
      )
      .subscribe((res) => {
        this.images = res || [];
      });
  }

  addArtistImage(image: Image): void {
    this.artistService
      .createImage(this.artist.id, image)
      .pipe(
        untilDestroyed(this),
        concatMap(() => this.artistService.getImages(this.artist.id))
      )
      .subscribe((res) => {
        this.images = res || [];
      });
  }
}
