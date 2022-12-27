import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuizDialogComponent } from './create-quiz-dialog.component';

describe('CreateQuizDialogComponent', () => {
  let component: CreateQuizDialogComponent;
  let fixture: ComponentFixture<CreateQuizDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateQuizDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
