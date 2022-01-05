import { concatMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Group } from './../../../@shared/models/group';
import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@app/@shared/models/image';
import { GroupService } from '../group.service';

@UntilDestroy()
@Component({
  selector: 'app-group-gallery',
  templateUrl: './group-gallery.component.html',
  styleUrls: ['./group-gallery.component.scss'],
})
export class GroupGalleryComponent implements OnInit {
  @Input() group: Group;

  images: Image[] = [];

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.groupService
      .getImages(this.group.id)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.images = res || [];
      });
  }

  deleteArtistImage(id: string): void {
    this.groupService
      .deleteImage(id)
      .pipe(
        untilDestroyed(this),
        concatMap(() => this.groupService.getImages(this.group.id))
      )
      .subscribe((res) => {
        this.images = res || [];
      });
  }

  addArtistImage(image: Image): void {
    this.groupService
      .createImage(this.group.id, image)
      .pipe(
        untilDestroyed(this),
        concatMap(() => this.groupService.getImages(this.group.id))
      )
      .subscribe((res) => {
        this.images = res || [];
      });
  }
}
