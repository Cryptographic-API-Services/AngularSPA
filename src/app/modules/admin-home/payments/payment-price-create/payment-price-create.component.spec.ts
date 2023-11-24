import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPriceCreateComponent } from './payment-price-create.component';

describe('PaymentPriceCreateComponent', () => {
  let component: PaymentPriceCreateComponent;
  let fixture: ComponentFixture<PaymentPriceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPriceCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPriceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
