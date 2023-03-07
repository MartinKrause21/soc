import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveUserDialogComponent } from './remove-user-dialog.component';

describe('RemoveUserDialogComponent', () => {
  let component: RemoveUserDialogComponent;
  let fixture: ComponentFixture<RemoveUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
