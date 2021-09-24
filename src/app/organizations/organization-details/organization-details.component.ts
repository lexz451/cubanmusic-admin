import { DataService } from '../../@shared/services/data.service';
import { finalize } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { UiService } from './../../@shared/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Organization } from '@shared/models/organization';
import { NgForm } from '@angular/forms';
import { OrganizationService } from '@app/organizations/organization.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Country } from '@shared/models/country';
import { ISelectableItem } from '@shared/models/selectable-item';
import { Observable, forkJoin } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
})
export class OrganizationDetailsComponent implements OnInit {
  org: Organization = new Organization();
  countries: Country[] = [];

  constructor(
    private organizationService: OrganizationService,
    private selectorService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    const req: Observable<any>[] = [];
    req.push(this.organizationService.countries);

    if (id) {
      req.push(this.organizationService.getById(id));
    }

    forkJoin(req)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.countries = res[0] || [];
        if (id) {
          this.org = res[1] || new Organization();
        }
      });
  }

  get selectableCountries(): ISelectableItem[] {
    return this.countries.map((e) => {
      return {
        id: e.id,
        name: e.name,
        icon: e.emoji,
      };
    });
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
            this.uiService.notifySuccess('Institucion actualizada con exito.');
          });
      } else {
        this.organizationService
          .createOrg(this.org)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Institucion creada con exito');
            this.router.navigate(['organizations']);
          });
      }
    }
  }
}
