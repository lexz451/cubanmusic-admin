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
          transform: 'translateX(0)',
        })
      ),
      state(
        'close',
        style({
          transform: 'translateX(100%)',
        })
      ),
      transition('open => close', [
        group([
          style({ transform: 'translateX(0)' }),
          animate(
            '0.2s ease',
            style({
              transform: 'translateX(100%)',
            })
          ),
        ]),
      ]),
      transition('close => open', [
        group([
          style({ transform: 'translateX(100%)' }),
          animate(
            '0.2s ease',
            style({
              transform: 'translateX(0)',
            })
          ),
        ]),
      ]),
      transition('* => open', [style({ opacity: 1 })]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  showSidebar = true;

  constructor() {}

  ngOnInit() {}
}
