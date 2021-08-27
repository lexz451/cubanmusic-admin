import { SharedModule } from '@shared';
import { AwardDetailsComponent } from './award-details/award-details.component';
import { AwardListComponent } from './award-list/award-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwardsRoutingModule } from './awards-routing.module';

@NgModule({
  declarations: [
    AwardListComponent,
    AwardDetailsComponent
  ],
  imports: [CommonModule, SharedModule, AwardsRoutingModule],
})
export class AwardsModule {}
