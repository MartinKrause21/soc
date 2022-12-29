import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuizDetailComponent } from './admin-quiz-detail.component';

describe('AdminQuizDetailComponent', () => {
  let component: AdminQuizDetailComponent;
  let fixture: ComponentFixture<AdminQuizDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminQuizDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuizDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
