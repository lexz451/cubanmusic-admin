import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
import { AuthModule } from '@app/auth';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from '@app/shell/loader/loader.component';
import { LottieModule } from 'ngx-lottie';
import { NotifierModule } from 'angular-notifier';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AvatarModule } from 'ngx-avatar';
import { SharedModule } from '@app/@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TranslateModule,
    NgbModule,
    AuthModule,
    I18nModule,
    LottieModule,
    RouterModule,
    NotifierModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    //LoadingBarHttpClientModule,
    SharedModule,
    AvatarModule,
  ],
  declarations: [HeaderComponent, SidebarComponent, ShellComponent, LoaderComponent],
})
export class ShellModule {}
