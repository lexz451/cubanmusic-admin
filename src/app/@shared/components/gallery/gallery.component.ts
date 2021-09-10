import { Masonry, MasonryInstance, MasonryOptions } from '@thisissoon/angular-masonry';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@shared/models/image';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  Input,
  Inject,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { toString } from 'lodash';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Output()
  submitImage: EventEmitter<Image> = new EventEmitter();

  @Input()
  images: Image[] = [];

  image?: Image = new Image();

  constructor(private modal: NgbModal) {}

  getImage(e: Image) {
    const base64 = e.filedata;
    const type = e.filetype;
    const img = `data:${type};base64,${base64}`;
    return img;
  }

  ngOnInit(): void {}

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

  onSubmitModal(form: NgForm, modal: NgbModalRef): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      modal.close('accept');
    }
  }
}
