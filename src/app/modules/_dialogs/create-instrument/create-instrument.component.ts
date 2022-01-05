import { Instrument } from './../../../@shared/models/instrument';
import { DialogComponent } from './../dialog.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-instrument',
  templateUrl: './create-instrument.component.html',
  styleUrls: ['./create-instrument.component.scss'],
})
export class CreateInstrumentComponent extends DialogComponent<Instrument> {}
