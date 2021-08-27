import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from './../group.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Group } from '@shared/models/group';
import { ISelectableItem } from '@shared/models/selectable-item';
import { forkJoin } from 'rxjs';
import { untilDestroyed } from '@shared';
import { finalize } from 'rxjs/operators';
import { SelectorService } from '@shared/services/selector.service';
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

  countries: ISelectableItem[] = [];
  awards: ISelectableItem[] = [];
  organizations: ISelectableItem[] = [];
  genres: ISelectableItem[] = [];
  recordLabels: ISelectableItem[] = [];
  artists: ISelectableItem[] = [];

  constructor(private selector: SelectorService, private uiService: UiService,
    private groupService: GroupService, private route: ActivatedRoute, private router: Router,
    private notifierService: NotifierService) {}

  ngOnInit(): void {
    this.uiService.showLoading();
    this.route.params.pipe(untilDestroyed(this)).subscribe(params => {
      if (params.id) {
        this.groupService.getById(params.id).pipe(
          untilDestroyed(this),
        ).subscribe(res => {
          this.group = res;
        })
      }
    });

    forkJoin([
      this.selector.countries,
      this.selector.organizations,
      this.selector.awards,
      this.selector.instruments,
      this.selector.genres,
      this.selector.jobTitles,
      this.selector.recordLabels,
      this.selector.artists,
    ])
      .pipe(
        untilDestroyed(this),
        finalize(() => this.uiService.hideLoading())
      )
      .subscribe((res) => {
        this.countries = res[0] || [];
        this.organizations = res[1] || [];
        this.awards = res[2] || [];
        this.genres = res[4] || [];
        this.recordLabels = res[6] || [];
        this.artists = res[7] || [];
      });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      this.uiService.showLoading();
      if (this.group.id) {
        this.groupService.updateGroup(this.group).pipe(untilDestroyed(this))
          .subscribe(() => {
            this.notifierService.notify('success', 'Grupo actualizado con exito.');
          });
      } else {
        this.groupService.createGroup(this.group).pipe(untilDestroyed(this))
          .subscribe(() => {
            this.notifierService.notify('success', 'Grupo creado con exito.');
            this.router.navigate(['groups']);
          });
      }
    }
  }
}
