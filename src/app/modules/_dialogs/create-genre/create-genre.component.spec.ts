/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateGenreComponent } from './create-genre.component';

describe('CreateGenreComponent', () => {
  let component: CreateGenreComponent;
  let fixture: ComponentFixture<CreateGenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGenreComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
