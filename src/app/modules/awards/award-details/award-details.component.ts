import { concatMap } from 'rxjs/operators';
import { Logger } from '../../../@shared/logger.service';
import { DataService } from '../../../@shared/services/data.service';
import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { UiService } from '../../../@shared/services/ui.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AwardService } from '../award.service';
import { NgForm } from '@angular/forms';
import { Award } from '../../../@shared/models/award';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from '@app/@shared/models/organization';
import { Country } from '@app/@shared/models/country';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

const log = new Logger('Award');

@UntilDestroy()
@Component({
  selector: 'app-award-details',
  templateUrl: './award-details.component.html',
  styleUrls: ['./award-details.component.scss'],
})
export class AwardDetailsComponent implements OnInit {
  award: Award = new Award();
  org: Organization = new Organization();
  country: Country = new Country();

  countries: ISelectableItem[];
  organizations: ISelectableItem[];

  constructor(
    private awardService: AwardService,
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private modal: NgbModal
  ) {}

  ngOnInit() {
    const { data } = this.route.snapshot.data;

    this.countries = data[0] || [];
    this.organizations = data[1] || [];
    this.award = data[2] || new Award();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      if (this.award.id) {
        this.awardService
          .update(this.award)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Premio actualizado con éxito.');
          });
      } else {
        this.awardService
          .create(this.award)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.router.navigate(['awards']).then(() => this.uiService.notifySuccess('Premio creado con éxito.'));
          });
      }
    }
  }

  createCountry(countryModal: any): void {
    this.country = new Country();
    this.modal
      .open(countryModal, {
        centered: true,
        size: 'md',
      })
      .result.then(
        () => {
          this.dataService
            .createCountry(this.country)
            .pipe(untilDestroyed(this))
            .subscribe((res) => {
              this.uiService.notifySuccess('País creado con éxito.');
            });
        },
        () => {}
      );
  }

  createOrg(orgModal: any): void {
    this.org = new Organization();
    this.modal
      .open(orgModal, {
        centered: true,
        size: 'lg',
      })
      .result.then(
        () => {
          this.dataService
            .createOrganization(this.org)
            .pipe(
              untilDestroyed(this),
              concatMap(() => this.awardService.organizations)
            )
            .subscribe((res) => {
              this.organizations = res || [];
              this.uiService.notifySuccess('Institución creada con éxito.');
            });
        },
        () => {}
      );
  }

  onAddCountry(form: NgForm, modal: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      modal.close('accept');
    }
  }

  onAddOrg(form: NgForm, modal: any) {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      modal.close('accept');
    }
  }
}
