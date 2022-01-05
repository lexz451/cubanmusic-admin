import { ListviewSelectorComponent } from './listview-selector/listview-selector.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageFile } from './../../models/image-file';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.scss'],
})
export class ListviewComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() title: string = '';
  @Input() icon: string;

  @Input() optionTemplate: TemplateRef<any>;

  @Input() value: any[] = [];
  @Output() valueChange = new EventEmitter();

  @Output() createElement = new EventEmitter();

  private defaultThumbnail: any = '/assets/default-image.jpg';

  get selection(): any[] {
    return this.data.filter((e) => this.value.indexOf(e.id) !== -1);
  }

  constructor(private modal: NgbModal) {}

  ngOnInit() {}

  getImage(item: any) {
    if (item.imageFile) {
      return ImageFile.toDataURL(item.imageFile);
    }
    return this.defaultThumbnail;
  }

  isSelected(value: any) {
    return this.value.indexOf(value) !== -1;
  }

  onSelectionChange() {
    this.valueChange.emit(this.value);
  }

  onCreate(): void {
    this.createElement.emit();
  }

  onSelect(): void {
    const ref = this.modal.open(ListviewSelectorComponent, {
      centered: true,
      size: 'md',
      backdrop: 'static',
    });
    const comp: ListviewSelectorComponent = ref.componentInstance;
    comp.data = this.data;
    comp.selection = this.value;
    ref.closed.toPromise().then(res => {
      if (res) {
        this.value = res;
        this.valueChange.emit(this.value);
      }
    });
  }

  removeItem = (item: any) => {
    this.value.splice(this.value.indexOf(item.id), 1);
    this.valueChange.emit(this.value);
  };
}
