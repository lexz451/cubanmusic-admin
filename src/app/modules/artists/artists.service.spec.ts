/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArtistsService } from './artists.service';

describe('Service: Artists', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtistsService],
    });
  });

  it('should ...', inject([ArtistsService], (service: ArtistsService) => {
    expect(service).toBeTruthy();
  }));
});
