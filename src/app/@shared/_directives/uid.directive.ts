import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[uid]',
  exportAs: 'uid',
})
export class UidDirective {
  @HostBinding('id')
  uid: string = this.getUID();

  constructor() {}

  getUID(): string {
    const timestamp = +new Date();
    const parts = timestamp.toString().split('').reverse();
    let uuid = '';
    for (let i = 0; i < 8; i++) {
      const index = this.getRandomInt(0, parts.length - 1);
      uuid += parts[index];
    }
    return uuid;
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  toString(): string {
    return this.uid;
  }
}
