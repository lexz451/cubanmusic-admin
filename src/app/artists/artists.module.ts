import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsComponent } from './artists.component';
import { ArtistsRoutingModule } from './artists-routing.module';
import { SharedModule } from '@app/@shared';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';

@NgModule({
  imports: [CommonModule, ArtistsRoutingModule, SharedModule],
  declarations: [ArtistsComponent, ArtistDetailsComponent],
})
export class ArtistsModule {}
