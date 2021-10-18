import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsRoutingModule } from '@app/modules/organizations/organizations-router.module';
import { OrganizationListComponent } from '@app/modules/organizations/organization-list/organization-list.component';
import { SharedModule } from '@shared';
import { OrganizationDetailsComponent } from '@app/modules/organizations/organization-details/organization-details.component';

@NgModule({
  declarations: [OrganizationListComponent, OrganizationDetailsComponent],
  imports: [CommonModule, OrganizationsRoutingModule, SharedModule],
})
export class OrganizationsModule {}
