import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../models/country';
import { ISelectableItem } from '../models/selectable-item';
import { ApiService } from './api.service';
import { Organization } from '@shared/models/organization';
import { Award } from '@shared/models/award';
import { map } from 'rxjs/operators';
import { Instrument } from '@shared/models/instrument';
import { Genre } from '@shared/models/genre';
import { JobTitle } from '@shared/models/job-title';
import { Recordlabel } from '@shared/models/recordlabel';
import { Artist } from '@shared/models/artist';

@Injectable({
  providedIn: 'root',
})
export class SelectorService {
  constructor(private api: ApiService) {}

  get yesOrNo(): ISelectableItem[] {
    return [
      {
        id: true,
        name: 'Yes',
      },
      {
        id: false,
        name: 'No',
      },
    ];
  }

  get genders(): ISelectableItem[] {
    return [
      {
        id: 'MALE',
        name: 'Male',
      },
      {
        id: 'FEMALE',
        name: 'Female',
      },
      {
        id: 'OTHER',
        name: 'Other',
      },
    ];
  }

  get venueTypes(): Observable<ISelectableItem[]> {
    return of([
      {
        id: 'BAR',
        name: 'Bar',
      },
      {
        id: 'PUB',
        name: 'Pub',
      },
      {
        id: 'CLUB',
        name: 'Club',
      },
      {
        id: 'RESTAURANT',
        name: 'Restaurant',
      },
      {
        id: 'HOTEL',
        name: 'Hotel',
      },
      {
        id: 'CONFERENCE_CENTER',
        name: 'Centro de Conferencias',
      },
      {
        id: 'BUSINESS_CENTER',
        name: 'Centro de Negocios',
      },
      {
        id: 'COMMUNITY_CENTER',
        name: 'Centro Comunitario',
      },
      {
        id: 'SPORT_CLUB',
        name: 'Club Deportivo',
      },
      {
        id: 'ART_GALLERY',
        name: 'Galeria de Arte',
      },
      {
        id: 'ACADEMY',
        name: 'Academia',
      },
      {
        id: 'HOME',
        name: 'Casa',
      },
      {
        id: 'PARK',
        name: 'Parque',
      },
      {
        id: 'FIELD',
        name: 'Terreno',
      },
      {
        id: 'CONCERT_HALL',
        name: 'Sala de Conciertos',
      },
    ]);
  }

  get countries(): Observable<ISelectableItem[]> {
    return this.api.get<Country[]>('/countries').pipe(
      map((countries) =>
        countries?.map((c) => {
          return {
            id: c.id,
            name: c.name,
            icon: c.emoji,
          };
        })
      )
    );
  }

  get organizations(): Observable<ISelectableItem[]> {
    return this.api.get<Organization[]>('/organizations').pipe(
      map((orgs) =>
        orgs?.map((o) => {
          return {
            id: o.id,
            name: o.name,
          };
        })
      )
    );
  }

  get awards(): Observable<ISelectableItem[]> {
    return this.api.get<Award[]>('/awards').pipe(
      map((awards) =>
        awards?.map((a) => {
          return {
            id: a.id,
            name: a.title,
          };
        })
      )
    );
  }

  get instruments(): Observable<ISelectableItem[]> {
    return this.api.get<Instrument[]>('/instruments').pipe(
      map((instruments) =>
        instruments?.map((i) => {
          return {
            id: i.id,
            name: i.name,
          };
        })
      )
    );
  }

  get genres(): Observable<ISelectableItem[]> {
    return this.api.get<Genre[]>('/genres').pipe(
      map((genres) =>
        genres?.map((g) => {
          return {
            id: g.id,
            name: g.name,
          };
        })
      )
    );
  }

  get jobTitles(): Observable<ISelectableItem[]> {
    return this.api.get<JobTitle[]>('/jobtitles').pipe(
      map((titles) =>
        titles?.map((t) => {
          return {
            id: t.id,
            name: t.title,
          };
        })
      )
    );
  }

  get recordLabels(): Observable<ISelectableItem[]> {
    return this.api.get<Recordlabel[]>('/recordlabels').pipe(
      map((labels) =>
        labels?.map((l) => {
          return {
            id: l.id,
            name: l.name,
          };
        })
      )
    );
  }

  get artists(): Observable<ISelectableItem[]> {
    return this.api.get<Artist[]>('/persons').pipe(
      map((persons) =>
        persons?.map((p) => {
          return {
            id: p.id,
            name: p.name,
          };
        })
      )
    );
  }
}
