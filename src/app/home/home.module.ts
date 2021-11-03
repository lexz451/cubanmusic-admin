import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@app/@shared/shared.module';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, HomeRoutingModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
