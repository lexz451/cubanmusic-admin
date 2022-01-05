import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import { Organization } from '@app/@shared/models/organization';
import { CreateJobtitleComponent } from './create-jobtitle/create-jobtitle.component';
import { JobTitle } from './../../@shared/models/job-title';
import { CreateInstrumentComponent } from './create-instrument/create-instrument.component';
import { Instrument } from './../../@shared/models/instrument';
import { CreateArtistComponent } from './create-artist/create-artist.component';
import { Artist } from '@app/@shared/models/artist';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { Album } from './../../@shared/models/album';
import { CreateGenreComponent } from './create-genre/create-genre.component';
import { Genre } from './../../@shared/models/genre';
import { CreateAwardComponent } from './create-award/create-award.component';
import { Award } from './../../@shared/models/award';
import { CreateRecordlabelComponent } from './create-recordlabel/create-recordlabel.component';
import { Recordlabel } from './../../@shared/models/recordlabel';
import { Location } from './../../@shared/models/location';
import { CreateLocationComponent } from './create-location/create-location.component';
import { DataService } from './../../@shared/services/data.service';
import { concatMap, tap } from 'rxjs/operators';
import { CreateCountryComponent } from './create-country/create-country.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from './../../@shared/models/country';
import { DialogComponent } from './dialog.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private modal: NgbModal, private dataService: DataService) {}

  showCountryDialog(): Observable<string> {
    const comp: DialogComponent<Country> = this.modal.open(CreateCountryComponent, {
      centered: true,
      size: 'md',
    }).componentInstance;
    return comp.onClose.pipe(
      concatMap((res) => this.dataService.createCountry(res).pipe(tap(() => comp.closeModal())))
    );
  }

  showLocationDialog(): Observable<string> {
    const comp: DialogComponent<Location> = this.modal.open(CreateLocationComponent, {
      centered: true,
      size: 'md',
    }).componentInstance;
    return comp.onClose.pipe(
      concatMap((res) => this.dataService.createLocation(res).pipe(tap(() => comp.closeModal())))
    );
  }

  showRecordLabelDialog(): Observable<string> {
    const comp: DialogComponent<Recordlabel> = this.modal.open(CreateRecordlabelComponent, {
      centered: true,
      size: 'md',
    }).componentInstance;
    return comp.onClose.pipe(
      concatMap((res) => this.dataService.createRecordLabel(res).pipe(tap(() => comp.closeModal())))
    );
  }

  showCreateOrganization(): Observable<string> {
    const comp: DialogComponent<Organization> = this.modal.open(CreateOrganizationComponent, {
      centered: true,
      size: 'lg',
    }).componentInstance;
    return comp.onClose.pipe(
      concatMap((res) => this.dataService.createOrganization(res).pipe(tap(() => comp.closeModal())))
    );
  }

  showAwardDialog(): Observable<string> {
    const comp: DialogComponent<Award> = this.modal.open(CreateAwardComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
    }).componentInstance;
    return comp.onClose.pipe(concatMap((res) => this.dataService.createAward(res).pipe(tap(() => comp.closeModal()))));
  }

  showGenreDialog(): Observable<string> {
    const comp: DialogComponent<Genre> = this.modal.open(CreateGenreComponent, {
      centered: true,
      size: 'md',
    }).componentInstance;
    return comp.onClose.pipe(concatMap((res) => this.dataService.createGenre(res).pipe(tap(() => comp.closeModal()))));
  }

  showAlbumDialog(): Observable<string> {
    const comp: DialogComponent<Album> = this.modal.open(CreateAlbumComponent, {
      centered: true,
      size: 'lg',
    }).componentInstance;
    return comp.onClose.pipe(concatMap((res) => this.dataService.createAlbum(res).pipe(tap(() => comp.closeModal()))));
  }

  showArtistDialog(): Observable<string> {
    const comp: DialogComponent<Artist> = this.modal.open(CreateArtistComponent, {
      centered: true,
      size: 'lg',
    }).componentInstance;
    return comp.onClose.pipe(concatMap((res) => this.dataService.createArtist(res).pipe(tap(() => comp.closeModal()))));
  }

  showInstrumentDialog(): Observable<string> {
    const comp: DialogComponent<Instrument> = this.modal.open(CreateInstrumentComponent, {
      centered: true,
      size: 'md',
    }).componentInstance;
    return comp.onClose.pipe(
      concatMap((res) => this.dataService.createInstrument(res).pipe(tap(() => comp.closeModal())))
    );
  }

  showJobTitleDialog(): Observable<string> {
    const comp: DialogComponent<JobTitle> = this.modal.open(CreateJobtitleComponent, {
      centered: true,
      size: 'md',
    }).componentInstance;
    return comp.onClose.pipe(
      concatMap((res) => this.dataService.createJobTitle(res).pipe(tap(() => comp.closeModal())))
    );
  }
}
