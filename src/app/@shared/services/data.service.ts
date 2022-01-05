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
import { SearchResult } from '../models/search-result';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private apiService: ApiService) {}

  private _genders = [
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

  private _venueTypes = [
    {
      id: 'THEATER',
      name: 'Teatro',
    },
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
  ];

  get genders() {
    return this._genders;
  }

  get genders$() {
    return of(this.genders);
  }

  get venueTypes() {
    return this._venueTypes;
  }

  get venueTypes$() {
    return of(this._venueTypes);
  }

  get countries$() {
    return this.apiService.get<Country[]>('/countries');
  }

  get organizations$() {
    return this.apiService.get<Organization[]>('/organizations');
  }

  get awards$() {
    return this.apiService.get<Award[]>('/awards');
  }

  get instruments$() {
    return this.apiService.get<Instrument[]>('/instruments');
  }

  get genres$() {
    return this.apiService.get<Genre[]>('/genres');
  }

  get jobTitles$() {
    return this.apiService.get<JobTitle[]>('/jobtitles');
  }

  get recordLabels$() {
    return this.apiService.get<Recordlabel[]>('/recordlabels');
  }

  get locations$() {
    return this.apiService.get<Location[]>('/locations');
  }

  get artists$() {
    return this.apiService.get<Artist[]>('/persons');
  }

  get albums$() {
    return this.apiService.get<Album[]>('/albums');
  }

  createJobTitle(jobTitle: JobTitle): Observable<string> {
    return this.apiService.post('/jobtitles/new', jobTitle);
  }

  createInstrument(instrument: Instrument): Observable<string> {
    return this.apiService.post('/instruments/new', instrument);
  }

  createCountry(country: Country): Observable<string> {
    return this.apiService.post('/countries/new', country);
  }

  createLocation(location: Location): Observable<string> {
    return this.apiService.post('/locations/new', location);
  }

  createAlbum(album: Album): Observable<string> {
    return this.apiService.post('/albums/new', album);
  }

  createGenre(genre: Genre): Observable<string> {
    return this.apiService.post('/genres/new', genre);
  }

  createAward(award: Award): Observable<string> {
    return this.apiService.post('/awards/new', award);
  }

  createRecordLabel(label: Recordlabel): Observable<string> {
    return this.apiService.post('/recordlabels/new', label);
  }

  createOrganization(org: Organization): Observable<string> {
    return this.apiService.post('/organizations/new', org);
  }

  createArtist(artist: Artist): Observable<string> {
    return this.apiService.post<string, Artist>('/persons/new', artist);
  }

  search(query: string): Observable<SearchResult[]> {
    return this.apiService.get<SearchResult[]>(`/search?query=${query}`);
  }
}
