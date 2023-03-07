import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserSchoolClassDialogComponent } from './edit-user-school-class-dialog.component';

describe('EditUserSchoolClassDialogComponent', () => {
  let component: EditUserSchoolClassDialogComponent;
  let fixture: ComponentFixture<EditUserSchoolClassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserSchoolClassDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserSchoolClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
