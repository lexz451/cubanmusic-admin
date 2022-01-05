import { ArtistGalleryComponent } from './artist-gallery/artist-gallery.component';
import { ArtistArticlesComponent } from './artist-articles/artist-articles.component';
import { ArtistQuotesComponent } from './artist-quotes/artist-quotes.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsRoutingModule } from './artist-routing.module';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { SharedModule } from '@app/@shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, ArtistsRoutingModule],
  declarations: [
    ArtistListComponent,
    ArtistDetailsComponent,
    ArtistQuotesComponent,
    ArtistArticlesComponent,
    ArtistGalleryComponent,
  ],
})
export class ArtistsModule {}
