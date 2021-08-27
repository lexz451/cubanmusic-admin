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

@UntilDestroy()
@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
})
export class OrganizationDetailsComponent implements OnInit {
  org: Organization = new Organization();
  countries: Country[] = [];

  constructor(private organizationService: OrganizationService,
    private route: ActivatedRoute, private router: Router, private uiService: UiService,
    private notifierService: NotifierService) {}

  ngOnInit(): void {
    this.route.params.pipe(untilDestroyed(this)).subscribe(params => {
      if (params.id) {
        this.organizationService.getById(params.id).pipe(untilDestroyed(this))
          .subscribe(res => {
            this.org = res || new Organization()
          })
      }
    });

    this.organizationService.countries.pipe(untilDestroyed(this)).subscribe((countries) => {
      this.countries = countries;
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      this.uiService.showLoading();
      if (this.org.id) {
        this.organizationService.updateOrg(this.org).pipe(untilDestroyed(this), finalize(() => this.uiService.hideLoading())).subscribe(() => {
          this.notifierService.notify('success', 'Institucion actualizada con exito.')
        });
      } else {
        this.organizationService.createOrg(this.org).pipe(untilDestroyed(this), finalize(() => this.uiService.hideLoading())).subscribe(() => {
          this.notifierService.notify('success', 'Institucion creada con exito');
        });
      }
    }
  }

  get mappedCountries(): ISelectableItem[] {
    return this.countries.map((e) => {
      return {
        id: e.id,
        name: e.name,
        icon: e.emoji,
      };
    });
  }
}
