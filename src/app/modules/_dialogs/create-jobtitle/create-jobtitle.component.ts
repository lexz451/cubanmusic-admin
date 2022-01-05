import { DialogComponent } from './../dialog.component';
import { Component, OnInit } from '@angular/core';
import { JobTitle } from '@app/@shared/models/job-title';

@Component({
  selector: 'app-create-jobtitle',
  templateUrl: './create-jobtitle.component.html',
  styleUrls: ['./create-jobtitle.component.scss'],
})
export class CreateJobtitleComponent extends DialogComponent<JobTitle> {}
