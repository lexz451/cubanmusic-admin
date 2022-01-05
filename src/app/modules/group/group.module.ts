import { NgSelectModule } from '@ng-select/ng-select';
import { GroupGalleryComponent } from './group-gallery/group-gallery.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupsRoutingModule } from '@app/modules/group/group-routing.module';
import { GroupArticlesComponent } from './group-articles/group-articles.component';
import { GroupQuotesComponent } from './group-quotes/group-quotes.component';
import { SharedModule } from '@app/@shared/shared.module';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';

@NgModule({
  declarations: [
    GroupListComponent,
    GroupDetailsComponent,
    GroupArticlesComponent,
    GroupQuotesComponent,
    GroupGalleryComponent,
  ],
  imports: [CommonModule, SharedModule, GroupsRoutingModule, NgOptionHighlightModule],
})
export class GroupsModule {}
