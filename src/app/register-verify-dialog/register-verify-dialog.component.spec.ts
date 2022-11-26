import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVerifyDialogComponent } from './register-verify-dialog.component';

describe('RegisterVerifyDialogComponent', () => {
  let component: RegisterVerifyDialogComponent;
  let fixture: ComponentFixture<RegisterVerifyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterVerifyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVerifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
