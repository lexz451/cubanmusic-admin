import { UiService } from './../../services/ui.service';
import { ImagesService } from '@app/@shared/services/images.service';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@shared/models/image';
import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  @Output()
  submitImage: EventEmitter<Image> = new EventEmitter();
  @Output()
  deleteImage: EventEmitter<number> = new EventEmitter();

  @Input()
  images: Observable<Image[]>;

  image?: Image = new Image();

  _subscriptions: Subscription[] = [];

  constructor(private modal: NgbModal, private _imageService: ImagesService, private _uiService: UiService) {}

  getImage(e: Image) {
    const base64 = e.filedata;
    const type = e.filetype;
    const img = `data:${type};base64,${base64}`;
    return img;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subscriptions.forEach((e) => e.unsubscribe());
  }

  onItemsLoaded() {}

  addImage(modal: any): void {
    this.image = new Image();
    this.modal
      .open(modal, {
        size: 'md',
        centered: true,
        backdrop: 'static',
      })
      .result.then(
        () => {
          this.submitImage.emit(this.image);
        },
        () => {}
      );
  }

  onDeleteImage(id: number): void {
    this.deleteImage.emit(id);
  }

  onSubmitModal(form: NgForm, modal: NgbModalRef): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      modal.close('accept');
    }
  }
}
