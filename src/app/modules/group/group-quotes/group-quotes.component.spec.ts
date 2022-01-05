/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GroupQuotesComponent } from './group-quotes.component';

describe('GroupQuotesComponent', () => {
  let component: GroupQuotesComponent;
  let fixture: ComponentFixture<GroupQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupQuotesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
