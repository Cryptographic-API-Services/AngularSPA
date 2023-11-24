import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'app-payment-prices',
  templateUrl: './payment-prices.component.html',
  styleUrls: ['./payment-prices.component.css']
})
export class PaymentPricesComponent implements OnInit {

  public priceForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.priceForm = this.formBuilder.group({
      price: ['', Validators.required]
    });
  }

  submitPriceForm() {

  }
}
