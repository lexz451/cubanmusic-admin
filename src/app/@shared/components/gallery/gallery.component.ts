import { ImageFile } from './../../models/image-file';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@shared/models/image';
import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Output()
  submitImage: EventEmitter<Image> = new EventEmitter();
  @Output()
  deleteImage: EventEmitter<string> = new EventEmitter();

  @Input()
  images: Image[] = [];

  image?: Image = new Image();

  imageFile?: File;

  constructor(private modal: NgbModal) {}

  getImage(e: Image) {
    return e.imageFile ? ImageFile.toDataURL(e.imageFile) : null;
  }

  ngOnInit(): void {}

  onImageFileChange(): void {
    const reader = new FileReader();
    reader.onload = () => {
      if (!this.image.imageFile) {
        this.image.imageFile = new ImageFile();
      }
      this.image.imageFile.filedata = ImageFile.toBase64(reader.result as string);
      this.image.imageFile.filename = this.imageFile.name;
      this.image.imageFile.filetype = this.imageFile.type;
    };
    if (this.imageFile) {
      reader.readAsDataURL(this.imageFile);
    }
  }

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

  onDeleteImage(id: string): void {
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
