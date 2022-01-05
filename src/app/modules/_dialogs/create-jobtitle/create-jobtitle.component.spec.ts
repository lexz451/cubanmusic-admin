/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateJobtitleComponent } from './create-jobtitle.component';

describe('CreateJobtitleComponent', () => {
  let component: CreateJobtitleComponent;
  let fixture: ComponentFixture<CreateJobtitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateJobtitleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
