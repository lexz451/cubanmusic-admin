import { ArtistArticlesComponent } from './artist-articles/artist-articles.component';
import { ArtistQuotesComponent } from './artist-quotes/artist-quotes.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsRoutingModule } from './artists-routing.module';
import { SharedModule } from '@app/@shared';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';

@NgModule({
  imports: [CommonModule, ArtistsRoutingModule, SharedModule],
  declarations: [ArtistListComponent, ArtistDetailsComponent, ArtistQuotesComponent, ArtistArticlesComponent],
})
export class ArtistsModule {}
