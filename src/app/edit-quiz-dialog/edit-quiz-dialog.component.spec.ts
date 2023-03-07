import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuizDialogComponent } from './edit-quiz-dialog.component';

describe('EditQuizDialogComponent', () => {
  let component: EditQuizDialogComponent;
  let fixture: ComponentFixture<EditQuizDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuizDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
