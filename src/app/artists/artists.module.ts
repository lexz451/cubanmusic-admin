import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsComponent } from './artists.component';
import { ArtistsRoutingModule } from './artists-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, ArtistsRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [ArtistsComponent, ArtistDetailsComponent],
})
export class ArtistsModule {}
