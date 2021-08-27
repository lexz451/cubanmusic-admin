import { SelectorService } from './../../@shared/services/selector.service';
import { Organization } from './../../@shared/models/organization';
import { Country } from './../../@shared/models/country';
import { ISelectableItem } from './../../@shared/models/selectable-item';
import { NotifierService } from 'angular-notifier';
import { finalize } from 'rxjs/operators';
import { UiService } from './../../@shared/services/ui.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AwardService } from './../award.service';
import { NgForm } from '@angular/forms';
import { Award } from './../../@shared/models/award';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { forkJoin } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-award-details',
  templateUrl: './award-details.component.html',
  styleUrls: ['./award-details.component.scss']
})
export class AwardDetailsComponent implements OnInit {

  award: Award = new Award();

  countries: ISelectableItem[] = [];
  orgs: ISelectableItem[] = [];

  constructor(
    private awardService: AwardService,
    private uiService: UiService,
    private notifier: NotifierService,
    private router: Router,
    private route: ActivatedRoute,
    private selector: SelectorService
  ) { }

  ngOnInit() {
    this.uiService.showLoading();
    this.route.params.pipe(untilDestroyed(this))
      .subscribe(params => {
        if (params.id) {
          this.awardService.getById(params.id).pipe(untilDestroyed(this))
            .subscribe(res => {
              this.award = res || new Award();
            });
        }
        forkJoin([this.selector.countries, this.selector.organizations]).pipe(
          untilDestroyed(this),
          finalize(() => this.uiService.hideLoading())
        ).subscribe(res => {
          this.countries = res[0] || [];
          this.orgs = res[1] || [];
        })
      })

  }


  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      this.uiService.showLoading();
      if (this.award.id) {
        this.awardService.updateAward(this.award).pipe(
          untilDestroyed(this),
          finalize(() => {
            this.uiService.hideLoading();
          })
        ).subscribe(() => {
          this.notifier.notify('success', 'Premio actualizado con exito');
        });
      } else {
        this.awardService.createAward(this.award).pipe(
          untilDestroyed(this),
          finalize(() => {
            this.uiService.hideLoading();
          })
        ).subscribe(() => {
          this.notifier.notify('success', 'Premio creado con exito');
          this.router.navigate(['awards']);
        });
      }
    }
  }
}
