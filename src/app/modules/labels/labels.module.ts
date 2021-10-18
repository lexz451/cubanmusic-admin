import { LabelsRoutingModule } from './labels-routing.module';
import { SharedModule } from '@shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelListComponent } from './label-list/label-list.component';
import { LabelDetailsComponent } from './label-details/label-details.component';

@NgModule({
  declarations: [LabelListComponent, LabelDetailsComponent],
  imports: [CommonModule, SharedModule, LabelsRoutingModule],
})
export class LabelsModule {}
