import { DataService } from '../../../@shared/services/data.service';
import { finalize } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { UiService } from '../../../@shared/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Organization } from '@shared/models/organization';
import { NgForm } from '@angular/forms';
import { OrganizationService } from '@app/modules/organization/organization.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Country } from '@shared/models/country';
import { ISelectableItem } from '@shared/models/selectable-item';
import { Observable, forkJoin, Subscription } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
})
export class OrganizationDetailsComponent implements OnInit {
  org: Organization = new Organization();
  countries: ISelectableItem[] = [];

  constructor(
    private organizationService: OrganizationService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    const { data } = this.route.snapshot.data;
    this.countries = data[0] || [];
    this.org = data[1] || new Organization();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      if (this.org.id) {
        this.organizationService
          .updateOrg(this.org)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Institución actualizada con éxito.');
          });
      } else {
        this.organizationService
          .createOrg(this.org)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.router
              .navigate(['organizations'])
              .then(() => this.uiService.notifySuccess('Institución creada con éxito'));
          });
      }
    }
  }
}
