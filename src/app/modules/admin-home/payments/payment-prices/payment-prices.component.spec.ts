import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPricesComponent } from './payment-prices.component';

describe('PaymentPricesComponent', () => {
  let component: PaymentPricesComponent;
  let fixture: ComponentFixture<PaymentPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPricesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
