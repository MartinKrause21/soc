import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendedSupportSnackbarComponent } from './sended-support-snackbar.component';

describe('SendedSupportSnackbarComponent', () => {
  let component: SendedSupportSnackbarComponent;
  let fixture: ComponentFixture<SendedSupportSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendedSupportSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendedSupportSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
