import { Artist } from './../../@core/model/artist';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
})
export class ArtistDetailsComponent implements OnInit {
  editable = false;
  artist?: Artist;

  constructor() {}

  ngOnInit() {}
}
