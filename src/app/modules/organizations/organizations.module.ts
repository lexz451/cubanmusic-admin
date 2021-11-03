import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationsRoutingModule } from '@app/modules/organizations/organizations-router.module';
import { OrganizationListComponent } from '@app/modules/organizations/organization-list/organization-list.component';
import { OrganizationDetailsComponent } from '@app/modules/organizations/organization-details/organization-details.component';
import { SharedModule } from '@app/@shared/shared.module';

@NgModule({
  declarations: [OrganizationListComponent, OrganizationDetailsComponent],
  imports: [CommonModule, OrganizationsRoutingModule, SharedModule],
})
export class OrganizationsModule {}
