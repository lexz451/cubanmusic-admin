import { DialogService } from './dialog.service';
import { Observable, Subject, of } from 'rxjs';
import { DataService } from './../../@shared/services/data.service';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Injector, OnDestroy } from '@angular/core';

@Component({
  template: '',
})
export class DialogComponent<T> implements OnInit, OnDestroy {
  result: T = <T>{};

  countries$: Observable<any[]>;
  locations$: Observable<any[]>;
  organizations$: Observable<any[]>;
  artists$: Observable<any[]>;
  recordLabels$: Observable<any[]>;
  genders$: Observable<any>;

  protected modal: NgbModal;
  protected modalActive: NgbActiveModal;
  protected dataService: DataService;
  protected dialogService: DialogService;

  onClose = new Subject<T>();

  constructor(injector: Injector) {
    this.modal = injector.get(NgbModal);
    this.modalActive = injector.get(NgbActiveModal);
    this.dataService = injector.get(DataService);
    this.dialogService = injector.get(DialogService);
  }

  ngOnInit(): void {
    this.countries$ = this.dataService.countries$;
    this.locations$ = this.dataService.locations$;
    this.organizations$ = this.dataService.organizations$;
    this.artists$ = this.dataService.artists$;
    this.recordLabels$ = this.dataService.recordLabels$;
    this.genders$ = this.dataService.genders$;
  }

  ngOnDestroy(): void {
    this.onClose.unsubscribe();
  }

  validateModal(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      this.onClose.next(this.result);
    }
  }

  closeModal(): void {
    this.modalActive.close(this.result);
  }

  dismissModal(): void {
    this.modalActive.dismiss();
  }
}
