import { zipWith } from 'lodash';
import { Album } from '../models/album';
import { Injectable } from '@angular/core';
import { Observable, of, zip, concat, forkJoin } from 'rxjs';
import { Country } from '../models/country';
import { ISelectableItem } from '../models/selectable-item';
import { ApiService } from './api.service';
import { Organization } from '@shared/models/organization';
import { Award } from '@shared/models/award';
import { concatMap, map, mergeMap, share, shareReplay, zipAll, switchMap } from 'rxjs/operators';
import { Instrument } from '@shared/models/instrument';
import { Genre } from '@shared/models/genre';
import { JobTitle } from '@shared/models/job-title';
import { Recordlabel } from '@shared/models/recordlabel';
import { Artist } from '@shared/models/artist';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private apiService: ApiService) {}

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
        name: 'Hombre',
      },
      {
        id: 'FEMALE',
        name: 'Mujer',
      },
      {
        id: 'OTHER',
        name: 'Otro',
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
    return this.apiService.get<Country[]>('/countries').pipe(
      map((countries) =>
        countries?.map((c) => {
          return {
            id: c.id,
            name: c.name,
            icon: c.emoji,
          };
        })
      ),
      share()
    );
  }

  get fullCountries(): Observable<Country[]> {
    return this.apiService.get<Country[]>('/countries');
  }

  get organizations(): Observable<ISelectableItem[]> {
    return this.apiService.get<Organization[]>('/organizations').pipe(
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
    return this.apiService.get<Award[]>('/awards').pipe(
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
    return this.apiService.get<Instrument[]>('/instruments').pipe(
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
    return this.apiService.get<Genre[]>('/genres').pipe(
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
    return this.apiService.get<JobTitle[]>('/jobtitles').pipe(
      map((titles) =>
        titles?.map((t) => {
          return {
            id: t.id,
            name: t.name,
          };
        })
      )
    );
  }

  get recordLabels(): Observable<ISelectableItem[]> {
    return this.apiService.get<Recordlabel[]>('/recordlabels').pipe(
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

  get locations(): Observable<ISelectableItem[]> {
    const countries$ = this.countries.pipe(share());
    const locations$ = this.apiService.get<Location[]>('/locations');
    return zip(countries$, locations$).pipe(
      map((e) =>
        e[1].map((l) => {
          const country = e[0].find((c) => c.id == l.country);
          const location$ = [];
          if (l.city) {
            location$.push(l.city);
          }
          if (l.state) {
            location$.push(l.state);
          }
          if (country?.name) {
            location$.push(country.name);
          }
          const res = location$.join(', ');
          return {
            id: l.id,
            name: res,
          };
        })
      ),
      share()
    );
  }

  get artists(): Observable<ISelectableItem[]> {
    return this.apiService.get<Artist[]>('/persons').pipe(
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

  get albums(): Observable<Album[]> {
    return this.apiService.get<Album[]>('/albums');
  }

  get selectableAlbums(): Observable<ISelectableItem[]> {
    return this.apiService.get<Album[]>('/albums').pipe(
      map((albums) =>
        albums?.map(
          (a) =>
            <ISelectableItem>{
              id: a.id,
              name: a.title,
            }
        )
      )
    );
  }

  createJobTitle(jobTitle: JobTitle): Observable<number> {
    return this.apiService.post('/jobtitles/new', jobTitle);
  }

  createInstrument(instrument: Instrument): Observable<number> {
    return this.apiService.post('/instruments/new', instrument);
  }

  createCountry(country: Country): Observable<number> {
    return this.apiService.post('/countries/new', country);
  }

  createLocation(location: Location): Observable<number> {
    return this.apiService.post('/locations/new', location);
  }

  createAlbum(album: Album): Observable<number> {
    return this.apiService.post('/albums/new', album);
  }

  createGenre(genre: Genre): Observable<number> {
    return this.apiService.post('/genres/new', genre);
  }

  createAward(award: Award): Observable<number> {
    return this.apiService.post('/awards/new', award);
  }

  createRecordLabel(label: Recordlabel): Observable<number> {
    return this.apiService.post('/recordlabels/new', label);
  }

  createOrganization(org: Organization): Observable<number> {
    return this.apiService.post('/organizations/new', org);
  }

  search(name: string): Observable<any[]> {
    return this.apiService.post('/search', name, true);
  }
}
