import { Subscription } from 'rxjs';
import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, Renderer2, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { UiService } from '@shared/services/ui.service';
import { debounceTime, delay } from 'rxjs/operators';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading = false;

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
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this._subcription?.unsubscribe();
  }

  ngAfterViewInit() {
    this._subcription = this.uiService.isLoading.subscribe((loading) => {
      this.isLoading = loading;
      this.cdRef.detectChanges();
    });
  }

  onAnimationCreated(anim: AnimationItem): void {
    this.anim = anim;
  }
}
