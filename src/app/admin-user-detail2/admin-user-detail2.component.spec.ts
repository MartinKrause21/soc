import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserDetail2Component } from './admin-user-detail2.component';

describe('AdminUserDetail2Component', () => {
  let component: AdminUserDetail2Component;
  let fixture: ComponentFixture<AdminUserDetail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserDetail2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserDetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
