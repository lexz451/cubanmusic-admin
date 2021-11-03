import { DatePipe } from '@angular/common';
import { UiService } from './../@shared/services/ui.service';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from './home.service';
import { Observable, throwError } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface User {
  name?: string;
  email?: string;
  password?: string;
  _confirmPwd?: string;
}

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  logs$: Observable<any[]>;
  users$: Observable<any[]>;

  user: User = {};

  constructor(
    private _homeService: HomeService,
    private _modal: NgbModal,
    private _uiService: UiService,
    private _datePipe: DatePipe
  ) {
    this.users$ = this._homeService.getUsers();
    //this.logs$ = this._homeService.getLogs();
  }

  ngOnInit() {
    this.isLoading = true;
  }

  get logsColumns(): ColDef[] {
    return [
      {
        field: 'type',
        headerName: 'Entidad',
      },
      {
        field: 'name',
        headerName: 'Nombre',
        wrapText: true,
        cellStyle: {
          'line-height': '1',
          'word-break': 'break-word',
          'justify-content': 'start',
        },
        width: 250,
      },
      {
        field: 'createdAt',
        headerName: 'Creado en',
        cellRenderer: (params) => {
          return params.value ? this._datePipe.transform(params.value) : '-';
        },
      },
      {
        field: 'updatedAt',
        headerName: 'Actualizado en',
        cellRenderer: (params) => {
          return params.value ? this._datePipe.transform(params.value) : '-';
        },
      },
      {
        field: 'createdBy',
        headerName: 'Creado por',
        cellRenderer: (params) => {
          const user = params.value;
          if (!user) return '-';
          return user?.name || user?.email;
        },
      },
      {
        field: 'updatedBy',
        headerName: 'Actualizado por',
        cellRenderer: (params) => {
          const user = params.value;
          if (!user) return '-';
          return user?.name || user?.email;
        },
      },
    ];
  }

  addUser(modal: any): void {
    this._modal
      .open(modal, {
        centered: true,
        size: 'md',
        backdrop: 'static',
      })
      .result.then(
        () => {
          this._homeService
            .createUser(this.user)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this._uiService.notifySuccess(
                'El usuario fue creado con exito. Ahora puede acceder al sistema con sus credenciales.'
              );
            });
        },
        () => {}
      );
  }

  onCreateUser(form: NgForm, modal: any): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      modal.close('accept');
    }
  }
}
