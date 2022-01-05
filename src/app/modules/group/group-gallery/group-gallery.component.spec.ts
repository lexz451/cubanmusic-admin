/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GroupGalleryComponent } from './group-gallery.component';

describe('GroupGalleryComponent', () => {
  let component: GroupGalleryComponent;
  let fixture: ComponentFixture<GroupGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupGalleryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
