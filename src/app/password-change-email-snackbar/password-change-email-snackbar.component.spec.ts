import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeEmailSnackbarComponent } from './password-change-email-snackbar.component';

describe('PasswordChangeEmailSnackbarComponent', () => {
  let component: PasswordChangeEmailSnackbarComponent;
  let fixture: ComponentFixture<PasswordChangeEmailSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordChangeEmailSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordChangeEmailSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
