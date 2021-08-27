/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CheckgroupComponent } from './checkgroup.component';

describe('CheckgroupComponent', () => {
  let component: CheckgroupComponent;
  let fixture: ComponentFixture<CheckgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckgroupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
