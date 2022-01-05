import { DialogComponent } from './../dialog.component';
import { Component, OnInit } from '@angular/core';
import { Organization } from '@app/@shared/models/organization';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent extends DialogComponent<Organization> {


}
