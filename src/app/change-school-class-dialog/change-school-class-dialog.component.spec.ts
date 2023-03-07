import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSchoolClassDialogComponent } from './change-school-class-dialog.component';

describe('ChangeSchoolClassDialogComponent', () => {
  let component: ChangeSchoolClassDialogComponent;
  let fixture: ComponentFixture<ChangeSchoolClassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSchoolClassDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSchoolClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
