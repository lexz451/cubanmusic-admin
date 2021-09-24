import { animate, group, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '300px',
        })
      ),
      state(
        'close',
        style({
          width: '100px',
        })
      ),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  showSidebar = true;

  constructor() {}

  toggle() {
    this.showSidebar = !this.showSidebar;
  }

  ngOnInit() {}
}
