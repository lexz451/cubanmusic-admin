import { Logger } from '../../../@shared/logger.service';
import { DataService } from '../../../@shared/services/data.service';
import { ISelectableItem } from '../../../@shared/models/selectable-item';
import { UiService } from '../../../@shared/services/ui.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AwardService } from '../award.service';
import { NgForm } from '@angular/forms';
import { Award } from '../../../@shared/models/award';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { forkJoin, Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

const log = new Logger('Award');

@UntilDestroy()
@Component({
  selector: 'app-award-details',
  templateUrl: './award-details.component.html',
  styleUrls: ['./award-details.component.scss'],
})
export class AwardDetailsComponent implements OnInit {
  award: Award = new Award();

  countries: ISelectableItem[] = [];
  orgs: ISelectableItem[] = [];

  constructor(
    private awardService: AwardService,
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute,
    private selector: DataService
  ) {}

  ngOnInit() {
    const req: Observable<any>[] = [];
    req.push(this.selector.countries);
    req.push(this.selector.organizations);
    const id = this.route.snapshot.params.id;
    if (id) {
      req.push(this.awardService.getById(id));
    }
    forkJoin(req)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.countries = res[0] || [];
        this.orgs = res[1] || [];
        if (id) {
          this.award = res[2] || new Award();
        }
      });
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
    } else {
      if (this.award.id) {
        this.awardService
          .updateAward(this.award)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Premio actualizado con exito');
          });
      } else {
        this.awardService
          .createAward(this.award)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.uiService.notifySuccess('Premio creado con exito');
            this.router.navigate(['awards']);
          });
      }
    }
  }
}
