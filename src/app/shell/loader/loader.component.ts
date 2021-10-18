import { Subscription } from 'rxjs';
import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { UiService } from '@shared/services/ui.service';
import { debounceTime, delay } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() isLoading = false;

  animOptions: AnimationOptions = {
    autoplay: true,
    loop: true,
    path: 'assets/anim/anim.json',
  };

  anim?: AnimationItem;

  private _subcription?: Subscription;

  constructor(
    private uiService: UiService,
    private ngZone: NgZone,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this._subcription?.unsubscribe();
  }

  ngAfterViewInit() {
    this._subcription = this.uiService.isLoading.subscribe((loading) => {
      if (loading) {
        this.renderer.setStyle(this.elRef.nativeElement, 'display', 'flex');
      } else {
        this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
      }
    });
  }

  onAnimationCreated(anim: AnimationItem): void {
    this.anim = anim;
  }
}
