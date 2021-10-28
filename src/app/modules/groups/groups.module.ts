import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { SharedModule } from '@shared';
import { GroupsRoutingModule } from '@app/modules/groups/groups-routing.module';
import { GroupArticlesComponent } from './group-articles/group-articles.component';
import { GroupQuotesComponent } from './group-quotes/group-quotes.component';

@NgModule({
  declarations: [
    GroupListComponent,
    GroupDetailsComponent,
    GroupArticlesComponent,
    GroupQuotesComponent
  ],
  imports: [CommonModule, SharedModule, GroupsRoutingModule],
})
export class GroupsModule {}
