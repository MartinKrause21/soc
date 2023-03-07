import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassDetailComponent } from './school-class-detail.component';

describe('SchoolClassDetailComponent', () => {
  let component: SchoolClassDetailComponent;
  let fixture: ComponentFixture<SchoolClassDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolClassDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
