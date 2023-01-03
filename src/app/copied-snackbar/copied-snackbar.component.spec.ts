import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopiedSnackbarComponent } from './copied-snackbar.component';

describe('CopiedSnackbarComponent', () => {
  let component: CopiedSnackbarComponent;
  let fixture: ComponentFixture<CopiedSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopiedSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopiedSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
