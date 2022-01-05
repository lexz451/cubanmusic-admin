import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { DialogComponent } from './../dialog.component';
import { Component, OnInit } from '@angular/core';
import { Album } from '@app/@shared/models/album';

@UntilDestroy()
@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss'],
})
export class CreateAlbumComponent extends DialogComponent<Album> implements OnInit {
  albumContributors$: Observable<any>;

  ngOnInit(): void {
    super.ngOnInit();
    this.albumContributors$ = combineLatest([
      this.artists$.pipe(map((res) => res.map((e) => e.name))),
      this.organizations$.pipe(map((res) => res.map((e) => e.name))),
    ]).pipe(
      map(([a, o]) => {
        return [...a, ...o];
      })
    );
  }

  createRecordLabel(): void {
    this.dialogService
      .showRecordLabelDialog()
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.result.recordLabelId = res;
        this.recordLabels$ = this.dataService.recordLabels$;
      });
  }
}
