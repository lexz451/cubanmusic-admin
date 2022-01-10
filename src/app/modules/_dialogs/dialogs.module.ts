import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';
import { CreateJobtitleComponent } from './create-jobtitle/create-jobtitle.component';
import { CreateInstrumentComponent } from './create-instrument/create-instrument.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { CreateGenreComponent } from './create-genre/create-genre.component';
import { CreateAwardComponent } from './create-award/create-award.component';
import { CreateRecordlabelComponent } from './create-recordlabel/create-recordlabel.component';
import { CreateCountryComponent } from './create-country/create-country.component';
import { CreateLocationComponent } from './create-location/create-location.component';
import { CreateArtistComponent } from './create-artist/create-artist.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/@shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CreateArtistComponent,
    CreateLocationComponent,
    CreateCountryComponent,
    CreateRecordlabelComponent,
    CreateAwardComponent,
    CreateGenreComponent,
    CreateAlbumComponent,
    CreateInstrumentComponent,
    CreateJobtitleComponent,
    CreateOrganizationComponent,
    AlertDialogComponent
  ],
  imports: [CommonModule, SharedModule, NgbModalModule],
})
export class DialogsModule {}
