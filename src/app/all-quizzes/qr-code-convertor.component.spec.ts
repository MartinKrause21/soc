import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeConvertorComponent } from './qr-code-convertor.component';

describe('QrCodeConvertorComponent', () => {
  let component: QrCodeConvertorComponent;
  let fixture: ComponentFixture<QrCodeConvertorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeConvertorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeConvertorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
