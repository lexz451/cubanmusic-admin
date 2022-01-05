import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/@shared/services/data.service';
import { AuthenticationService, CredentialsService } from '@app/auth';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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
    private dataService: DataService,
    private modal: NgbModal
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

  get username(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.name : null;
  }

  showProfile(modal: any) {
    this.modal
      .open(modal, {
        centered: true,
        size: 'md',
      })
      .result.then(
        () => {},
        () => {}
      );
  }

  search: OperatorFunction<string, readonly any[]> = ($query: Observable<string>) =>
    $query.pipe(
      debounceTime(200),
      switchMap((query: string) => this.dataService.search(query)),
      map(res => {
        return res?.map((e) => {
          return {
            type: e.type,
            id: e.data?.["id"],
            name: e.data?.["name"],
          };
        });
      })
    );

  resultFormatter = (item: any) => item?.name;

  inputFormatter = (item: any) => item?.name;

  goTo(event: any) {
    let result = event?.item;
    switch (result.type) {
      case 'info.cubanmusic.cubanmusicapi.model.Award':
        this.router.navigate(['awards', result.id]);
        break;
      case 'info.cubanmusic.cubanmusicapi.model.Venue':
        this.router.navigate(['venues', result.id]);
        break;
      case 'info.cubanmusic.cubanmusicapi.model.Organization':
        this.router.navigate(['organizations', result.id]);
        break;
      case 'info.cubanmusic.cubanmusicapi.model.RecordLabel':
        this.router.navigate(['labels', result.id]);
        break;
      case 'info.cubanmusic.cubanmusicapi.model.Group':
        this.router.navigate(['groups', result.id]);
        break;
      case 'info.cubanmusic.cubanmusicapi.model.Album':
        this.router.navigate(['albums', result.id]);
        break;
      case 'info.cubanmusic.cubanmusicapi.model.Person':
        this.router.navigate(['artists', result.id]);
        break;
      default:
        break;
    }
  }
}
