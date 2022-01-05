/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateCountryComponent } from './create-country.component';

describe('CreateCountryComponent', () => {
  let component: CreateCountryComponent;
  let fixture: ComponentFixture<CreateCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCountryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
