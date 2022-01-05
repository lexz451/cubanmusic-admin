import { FormsModule } from '@angular/forms';
import { AlbumListComponent } from './album-list/album-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsRoutingModule } from './album-routing.module';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { SharedModule } from '@app/@shared/shared.module';

@NgModule({
  declarations: [AlbumListComponent, AlbumDetailsComponent],
  imports: [CommonModule, SharedModule, AlbumsRoutingModule, FormsModule],
})
export class AlbumsModule {}
