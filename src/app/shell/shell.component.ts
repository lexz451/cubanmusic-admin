import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({
          position: 'relative',
        }),
        query(
          ':enter,:leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
            }),
          ],
          { optional: true }
        ),
        group([
          query(
            ':enter',
            [
              style({
                opacity: 0,
              }),
              animate(
                '100ms ease',
                style({
                  opacity: 1,
                })
              ),
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [
              animate(
                '100ms ease',
                style({
                  opacity: 0,
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class ShellComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
