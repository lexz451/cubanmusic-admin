/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GroupArticlesComponent } from './group-articles.component';

describe('GroupArticlesComponent', () => {
  let component: GroupArticlesComponent;
  let fixture: ComponentFixture<GroupArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupArticlesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
