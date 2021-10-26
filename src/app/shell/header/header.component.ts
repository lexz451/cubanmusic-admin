import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@app/@shared';
import { ISelectableItem } from '@app/@shared/models/selectable-item';
import { DataService } from '@app/@shared/services/data.service';

import { AuthenticationService, CredentialsService } from '@app/auth';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private dataService: DataService
  ) {}

  ngOnInit() {}

  logout() {
    this.authenticationService
      .logout()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get email(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.email : null;
  }

  search: OperatorFunction<string, readonly any[]> = ($query: Observable<string>) =>
    $query.pipe(
      debounceTime(200),
      switchMap((query: string) => this.dataService.search(query)),
      map((res: any[]) => {
        return res?.map((e) => {
          return {
            type: e[0],
            id: e[1],
            name: e[2],
          };
        });
      })
    );

  resultFormatter = (item: any) => item?.name

  inputFormatter = (item: any) => item?.name
}
