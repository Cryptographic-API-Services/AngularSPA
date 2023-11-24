import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProductCreateComponent } from './payment-product-create.component';

describe('PaymentProductCreateComponent', () => {
  let component: PaymentProductCreateComponent;
  let fixture: ComponentFixture<PaymentProductCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentProductCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentProductCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
