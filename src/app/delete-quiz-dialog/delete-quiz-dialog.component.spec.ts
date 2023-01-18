import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuizDialogComponent } from './delete-quiz-dialog.component';

describe('DeleteQuizDialogComponent', () => {
  let component: DeleteQuizDialogComponent;
  let fixture: ComponentFixture<DeleteQuizDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteQuizDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
