import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessCreateClassDialogComponent } from './sucess-create-class-dialog.component';

describe('SucessCreateClassDialogComponent', () => {
  let component: SucessCreateClassDialogComponent;
  let fixture: ComponentFixture<SucessCreateClassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucessCreateClassDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessCreateClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
