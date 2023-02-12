import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdminDialogComponent } from './delete-admin-dialog.component';

describe('DeleteAdminDialogComponent', () => {
  let component: DeleteAdminDialogComponent;
  let fixture: ComponentFixture<DeleteAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAdminDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
