import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizDetailComponent } from './user-quiz-detail.component';

describe('UserQuizDetailComponent', () => {
  let component: UserQuizDetailComponent;
  let fixture: ComponentFixture<UserQuizDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserQuizDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
