import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, Renderer2 } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { UiService } from '@shared/services/ui.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, AfterViewInit {
  @Input() isLoading = false;

  animOptions: AnimationOptions = {
    autoplay: true,
    loop: true,
    path: 'assets/anim/anim.json',
  };

  anim?: AnimationItem;

  constructor(
    private uiService: UiService,
    private ngZone: NgZone,
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.uiService.isLoading.subscribe((loading) => {
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

  private startAnim(): void {
    this.ngZone.runOutsideAngular(() => {
      this.anim?.play();
      this.anim?.setSpeed(3);
    });
  }

  private stopAnim(): void {
    this.ngZone.runOutsideAngular(() => {
      this.anim?.stop();
    });
  }
}
