/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateArtistComponent } from './create-artist.component';

describe('CreateArtistComponent', () => {
  let component: CreateArtistComponent;
  let fixture: ComponentFixture<CreateArtistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateArtistComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
