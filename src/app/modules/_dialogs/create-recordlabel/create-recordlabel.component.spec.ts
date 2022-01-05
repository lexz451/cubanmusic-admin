/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CreateRecordlabelComponent } from './create-recordlabel.component';

describe('CreateRecordlabelComponent', () => {
  let component: CreateRecordlabelComponent;
  let fixture: ComponentFixture<CreateRecordlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRecordlabelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecordlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
