import { ImageRendererComponent } from './../../@shared/components/table/renderers/image-renderer/image-renderer.component';
import { DatePipe } from '@angular/common';
import { UiService } from '../../@shared/services/ui.service';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from './home.service';
import { Observable, throwError } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
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
  logs$: Observable<any[]>;
  users$: Observable<any[]>;

  user: User = {};

  @ViewChild("addIcon") addIcon: TemplateRef<any>;

  constructor(
    private homeService: HomeService,
    private modal: NgbModal,
    private uiService: UiService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.users$ = this.homeService.getUsers();
    this.logs$ = this.homeService.getLogs();
  }

  get logsColumns(): ColDef[] {
    return [
      {
        field: 'type',
        headerName: '',
        cellRendererFramework: ImageRendererComponent,
        cellRendererParams: {
          mapValues: {
            'DELETE': '/assets/icons/delete.svg',
            'CREATE': '/assets/icons/create.svg',
            'UPDATE': '/assets/icons/update.svg'
          },
          width: 15,
          height: 15
        },
        width: 50,
        minWidth: 50,
        cellStyle: {
          padding: '0',

        }
      },
      {
        field: 'entityType',
        headerName: 'Entidad',
        width: 100,
        cellRenderer: ({value}) => {
          if (value == 'info.cubanmusic.cubanmusicapi.model.Album') return '<strong>Album</strong>'
          if (value == 'info.cubanmusic.cubanmusicapi.model.ArticleReference') return '<strong>Artículo</strong>'
          if (value == 'info.cubanmusic.cubanmusicapi.model.Award') return '<strong>Premio</strong>'
          if (value == 'info.cubanmusic.cubanmusicapi.model.Country') return '<strong>País</strong>'
          if (value == 'info.cubanmusic.cubanmusicapi.model.Instrument') return '<strong>Instrumento</strong>'
          if (value == 'info.cubanmusic.cubanmusicapi.model.JobTitle') return '<strong>Ocupación</strong>'
          if (value == 'info.cubanmusic.cubanmusicapi.model.Location') return '<strong>Ubicación</strong>'
          if (value == 'info.cubanmusic.cubanmusicapi.model.Organization') return '<strong>Organización</strong>'
          if (value == 'info.cubanmusic.cubanmusicapi.model.QuoteReference') return '<strong>Quote</strong>'
          if (value == 'info.cubanmusic.cubanmusicapi.model.RecordLabel') return '<strong>Sello</strong>'
          if (value == 'info.cubanmusic.cubanmusicapi.model.Venue') return '<strong>Venue</strong>'
          if (value == 'info.cubanmusic.cubanmusicapi.model.Artist') return '<strong>Artista</strong>'
          if (value == 'info.cubanmusic.cubanmusicapi.model.User') return '<strong>Usuario</strong>'
          return value;
        }
      },
      {
        field: 'entityName',
        headerName: 'Nombre',
        width: 100
      },
      {
        field: 'date',
        headerName: 'Fecha',
        cellRenderer: (params) => {
          return params.value ? this.datePipe.transform(params.value, 'dd/MM/YY HH:mm') : '-';
        },
        width: 80,
        minWidth: 80
      },
      {
        field: 'userEmail',
        headerName: 'Usuario',
        width: 100
      },
    ];
  }

  addUser(modal: any): void {
    this.modal
      .open(modal, {
        centered: true,
        size: 'md',
        backdrop: 'static',
      })
      .result.then(
        () => {
          this.homeService
            .createUser(this.user)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.uiService.notifySuccess(
                'Usuario fue creado con exito. Ahora puede acceder al sistema usando sus credenciales.'
              );
              this.users$ = this.homeService.getUsers();
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
