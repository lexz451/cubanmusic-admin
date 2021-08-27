import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsRoutingModule } from '@app/organizations/organizations-router.module';
import { OrganizationListComponent } from '@app/organizations/organization-list/organization-list.component';
import { SharedModule } from '@shared';
import { OrganizationDetailsComponent } from '@app/organizations/organization-details/organization-details.component';

@NgModule({
  declarations: [OrganizationListComponent, OrganizationDetailsComponent],
  imports: [CommonModule, OrganizationsRoutingModule, SharedModule],
})
export class OrganizationsModule {}
