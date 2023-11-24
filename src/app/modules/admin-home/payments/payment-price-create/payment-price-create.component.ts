import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/payments/product';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-price-create',
  templateUrl: './payment-price-create.component.html',
  styleUrls: ['./payment-price-create.component.css']
})
export class PaymentPriceCreateComponent implements OnInit {

  public priceForm: FormGroup;
  public products: Array<Product>;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.priceForm = this.formBuilder.group({
      product: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.getProductsForPrices();
  }

  private getProductsForPrices() {
    const url = environment.apiUrl + "Payments/GetProducts";
    this.http.getAuthenticated(url).subscribe((response: any) => {
      this.products = response.products;
    }, (error) => {
      this.toastr.error(error.error.error);
    });
  }

  submitPriceForm() {
    if (this.priceForm.valid) {
      const url = environment.apiUrl + "Payments/CreatePrice";
      const body = {
        productId: this.priceForm.value.product,
        price: this.priceForm.value.price
      };
      this.http.postAuthenticated(url, body).subscribe((response: any) => {
        this.toastr.success(response.message);
        this.priceForm.reset();
      }, (error) => {
        this.toastr.error(error.error.error);
      });
    } else {
      this.toastr.warning("Selecting a product and entering a price is required.");
    }
  }
}