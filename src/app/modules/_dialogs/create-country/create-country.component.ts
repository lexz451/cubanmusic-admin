import { DialogComponent } from './../dialog.component';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Country } from './../../../@shared/models/country';
import { Component, OnInit, EventEmitter } from '@angular/core';

@UntilDestroy()
@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.scss'],
})
export class CreateCountryComponent extends DialogComponent<Country> {}
