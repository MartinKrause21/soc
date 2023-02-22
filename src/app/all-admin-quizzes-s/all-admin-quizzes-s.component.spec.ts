import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdminQuizzesSComponent } from './all-admin-quizzes-s.component';

describe('AllAdminQuizzesSComponent', () => {
  let component: AllAdminQuizzesSComponent;
  let fixture: ComponentFixture<AllAdminQuizzesSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAdminQuizzesSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAdminQuizzesSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
