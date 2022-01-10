import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  @Input() message: string = '';

  constructor(
    private modal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modal.dismiss();
  }

  accept() {
    this.modal.close();
  }

}
