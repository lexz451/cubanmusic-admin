import { DialogComponent } from './../dialog.component';
import { Component, OnInit } from '@angular/core';
import { Genre } from '@app/@shared/models/genre';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.scss'],
})
export class CreateGenreComponent extends DialogComponent<Genre> {}
