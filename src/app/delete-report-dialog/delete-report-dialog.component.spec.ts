import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReportDialogComponent } from './delete-report-dialog.component';

describe('DeleteReportDialogComponent', () => {
  let component: DeleteReportDialogComponent;
  let fixture: ComponentFixture<DeleteReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
