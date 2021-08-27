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

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    AuthModule,
    I18nModule,
    LottieModule,
    RouterModule,
    NotifierModule,
  ],
  declarations: [HeaderComponent, SidebarComponent, ShellComponent, LoaderComponent],
})
export class ShellModule {}
