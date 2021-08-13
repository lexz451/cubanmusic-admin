import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  exportAs: 'clickOutside',
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter();

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any): void {
    const inside = this.elRef.nativeElement.contains(target);
    if (!inside) {
      this.clickOutside.emit();
    }
  }
}
