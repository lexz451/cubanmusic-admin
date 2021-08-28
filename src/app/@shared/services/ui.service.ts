import { NotifierService } from 'angular-notifier';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  isLoading = new BehaviorSubject(false);

  constructor(private _notifier: NotifierService) {}

  showLoading(): void {
    this.isLoading.next(true);
  }

  hideLoading(): void {
    this.isLoading.next(false);
  }

  notifySuccess(msg: string): void {
    this._notifier.notify('success', msg);
  }

  notifyInfo(msg: string): void {
    this._notifier.notify('info', msg);
  }

  notifyError(msg: string): void {
    this._notifier.notify('error', msg);
  }
}
