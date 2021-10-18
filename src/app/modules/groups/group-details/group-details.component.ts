import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Group } from '@shared/models/group';
import { ISelectableItem } from '@shared/models/selectable-item';
import { forkJoin, Observable } from 'rxjs';
import { untilDestroyed } from '@shared';
import { finalize } from 'rxjs/operators';
import { DataService } from '@app/@shared/services/data.service';
import { UiService } from '@shared/services/ui.service';
import { NgForm } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit {
  group: Group = new Group();


  constructor(
    private selector: DataService,
    private uiService: UiService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
    }
  }
}
