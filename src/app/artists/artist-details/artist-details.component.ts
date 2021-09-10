import { TableAction } from './../../@shared/models/table-actions';
import { ActionsRendererComponent } from './../../@shared/components/table/renderers/actions-renderer/actions-renderer.component';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef } from 'ag-grid-community';
import { Image } from '@shared/models/image';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { Artist } from '@app/@shared/models/artist';
import { ISelectableItem } from '@app/@shared/models/selectable-item';
import { SelectorService } from '@app/@shared/services/selector.service';
import { forkJoin, Observable } from 'rxjs';
import { ArtistsService } from '@app/artists/artists.service';
import { UiService } from '@shared/services/ui.service';
import { finalize, map, switchMap } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { Location } from '@shared/models/location';
import { ImagesService } from '@app/@shared/services/images.service';
import { Quote } from '@app/@shared/models/quote';

@UntilDestroy()
@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css'],
})
export class ArtistDetailsComponent implements OnInit {
  artist = new Artist();

  countries: ISelectableItem[] = [];
  awards: ISelectableItem[] = [];
  organizations: ISelectableItem[] = [];
  instruments: ISelectableItem[] = [];
  genres: ISelectableItem[] = [];
  jobTitles: ISelectableItem[] = [];
  recordLabels: ISelectableItem[] = [];
  artists: ISelectableItem[] = [];

  artistImages: Image[] = [];

  tabs: any[] = [
    { label: 'Datos Personales', fragment: 'personal' },
    { label: 'Datos Profesionales', fragment: 'professional' },
    { label: 'Datos de Contacto', fragment: 'contact' },
    { label: 'Galeria', fragment: 'gallery' },
  ];

  quote: Quote = new Quote();

  constructor(
    private selector: SelectorService,
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistsService,
    private uiService: UiService,
    private imagesService: ImagesService,
    private modal: NgbModal,
    private datePipe: DatePipe
  ) {}

  get genders(): ISelectableItem[] {
    return this.selector.genders;
  }

  get currentFragment() {
    return this.route.fragment;
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    const req: Observable<any>[] = [];
    req.push(
      this.selector.countries,
      this.selector.organizations,
      this.selector.awards,
      this.selector.instruments,
      this.selector.genres,
      this.selector.jobTitles,
      this.selector.recordLabels,
      this.selector.artists
    );

    if (id) {
      req.push(this.artistService.getById(id));
    }

    forkJoin(req)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.countries = res[0] || [];
        this.organizations = res[1] || [];
        this.awards = res[2] || [];
        this.instruments = res[3] || [];
        this.genres = res[4] || [];
        this.jobTitles = res[5] || [];
        this.recordLabels = res[6] || [];
        this.artists = res[7] || [];
        if (id) {
          this.artist = res[8] || new Artist();
          if (this.artist.id) {
            this.artists = this.artists.filter((a) => a.id !== this.artist.id);
            this.fetchImages();
          }
        }
      });
  }

  fetchImages() {
    this.imagesService
      .fetchImages(this.artist.images)
      .pipe(untilDestroyed(this))
      .subscribe((images) => {
        this.artistImages = images;
      });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      if (this.artist.id) {
        this.artistService
          .updateArtist(this.artist)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Artista actualizado con éxito.');
          });
      } else {
        this.artistService
          .createArtist(this.artist)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Artista creado con exito.');
            this.router.navigate(['artists']);
          });
      }
    }
  }

  uploadArtistImage(image: Image) {
    this.imagesService
      .uploadImage(image)
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        if (id) {
          this.artist.images.push(+id);
          this.artistService
            .updateArtist(this.artist)
            .pipe(
              untilDestroyed(this),
              finalize(() => {
                this.fetchImages();
              })
            )
            .subscribe(() => {
              this.uiService.notifySuccess('Imagen agregada con exito.');
            });
        }
      });
  }

  get isEditMode(): boolean {
    return !!this.artist.id;
  }

  get quotes(): Quote[] {
    return this.artist.quotes;
  }

  get quotesColumns(): ColDef[] {
    return [
      {
        field: 'quote',
        headerName: 'Comentario',
      },
      {
        field: 'author',
        headerName: 'Autor',
      },
      {
        field: 'source',
        headerName: 'Fuente',
      },
      {
        field: 'date',
        headerName: 'Fecha',
        cellRenderer: (params) => {
          return this.datePipe.transform(params.value, 'YYYY-MM-dd');
        },
      },
      {
        cellRendererFramework: ActionsRendererComponent,
        cellRendererParams: {
          useActions: (): TableAction[] => {
            return [TableAction.DELETE];
          },
          onAction: (type: TableAction, row: any) => {},
        },
        width: 100,
      },
    ];
  }

  addQuote(quoteModal: any): void {
    this.quote = new Quote();
    this.modal
      .open(quoteModal, {
        centered: true,
        size: 'md',
      })
      .result.then(
        () => {
          this.artistService
            .createQuote(this.artist.id, this.quote)
            .pipe(
              untilDestroyed(this),
              switchMap(() => this.artistService.getById(this.artist.id))
            )
            .subscribe((res) => {
              this.artist = res;
              this.uiService.notifySuccess('Quote agregado con exito.');
            });
        },
        () => {}
      );
  }
}
