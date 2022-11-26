import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeDialogComponent } from './password-change-dialog.component';

describe('PasswordChangeDialogComponent', () => {
  let component: PasswordChangeDialogComponent;
  let fixture: ComponentFixture<PasswordChangeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordChangeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
