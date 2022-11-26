import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedLoginDialogComponent } from './failed-login-dialog.component';

describe('FailedLoginDialogComponent', () => {
  let component: FailedLoginDialogComponent;
  let fixture: ComponentFixture<FailedLoginDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailedLoginDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
