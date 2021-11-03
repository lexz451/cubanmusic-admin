import { AlbumListComponent } from './album-list/album-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { SharedModule } from '@app/@shared/shared.module';

@NgModule({
  declarations: [AlbumListComponent, AlbumDetailsComponent],
  imports: [CommonModule, SharedModule, AlbumsRoutingModule],
})
export class AlbumsModule {}
