import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageFile } from './../../../models/image-file';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listview-selector',
  templateUrl: './listview-selector.component.html',
  styleUrls: ['./listview-selector.component.scss']
})
export class ListviewSelectorComponent implements OnInit {

  private defaultThumbnail: any = '/assets/default-image.jpg';

  data: any[] = [];

  selection: any[] = [];

  constructor(
    private modalRef: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  getImage(item: any) {
    if (item.imageFile) {
      return ImageFile.toDataURL(item.imageFile);
    }
    return this.defaultThumbnail;
  }

  isSelected(value: any) {
    return this.selection.indexOf(value) !== -1;
  }

  onDone(): void {
    this.modalRef.close(this.selection);
  }

  onDismiss(): void {
    this.modalRef.dismiss();
  }

}
