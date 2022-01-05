import { DialogComponent } from './../dialog.component';
import { Component, OnInit } from '@angular/core';
import { Award } from '@app/@shared/models/award';

@Component({
  selector: 'app-create-award',
  templateUrl: './create-award.component.html',
  styleUrls: ['./create-award.component.scss'],
})
export class CreateAwardComponent extends DialogComponent<Award> {}
