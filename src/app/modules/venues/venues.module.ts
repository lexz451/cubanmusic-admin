import { VenueDetailsComponent } from './venue-details/venue-details.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenuesRoutingModule } from './venues-routing.module';

@NgModule({
  declarations: [VenueListComponent, VenueDetailsComponent],
  imports: [CommonModule, SharedModule, VenuesRoutingModule],
})
export class VenuesModule {}
