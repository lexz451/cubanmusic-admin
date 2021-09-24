import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from './../group.service';
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

  countries: ISelectableItem[] = [];
  awards: ISelectableItem[] = [];
  organizations: ISelectableItem[] = [];
  genres: ISelectableItem[] = [];
  recordLabels: ISelectableItem[] = [];
  artists: ISelectableItem[] = [];

  constructor(
    private selector: DataService,
    private uiService: UiService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    const req: Observable<any>[] = [];
    req.push(
      this.selector.countries,
      this.selector.organizations,
      this.selector.awards,
      this.selector.genres,
      this.selector.recordLabels,
      this.selector.artists
    );
    if (id) {
      req.push(this.groupService.getById(id));
    }

    forkJoin(req)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.countries = res[0] || [];
        this.organizations = res[1] || [];
        this.awards = res[2] || [];
        this.genres = res[3] || [];
        this.recordLabels = res[4] || [];
        this.artists = res[5] || [];
        if (id) {
          this.group = res[6] || new Group();
        }
      });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      if (this.group.id) {
        this.groupService
          .updateGroup(this.group)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Grupo actualizado con exito.');
          });
      } else {
        this.groupService
          .createGroup(this.group)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Grupo creado con exito.');
            this.router.navigate(['groups']);
          });
      }
    }
  }
}
