import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductWithPrice } from 'src/app/interfaces/payments/product-with-price';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products-selection.component.html',
  styleUrls: ['./products-selection.component.css']
})
export class ProductsSelectionComponent implements OnInit {

  public products: Array<ProductWithPrice>;
  
  constructor(
    private http: HttpService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  
  private getProducts() {
    const url = environment.apiUrl + "Payments/GetProductsWithPrice"
    this.http.getAuthenticated(url).subscribe((response: any) => {
      this.products = response.products;
    });
  }

  public selectProduct(product: ProductWithPrice) {
    if (product.isAssignedToMe) {
      this.toastr.warning("This product is already assigned to you.");
      return;
    }
    const body = {
      stripeProductId: product.product.stripeId,
      stripePriceId: product.prices[0].stripeId
    };
    const url = environment.apiUrl + "Payments/AssignProductToUser";
    this.http.putAuthenticated(url, body).subscribe((response: any) => {
      this.getProducts();
      this.toastr.success(response.message);
    }, (error: any) => {
      this.toastr.error(error.error.error);
    });
  } 

  public disableSubscription() {
    const url = environment.apiUrl + "Payments/DisableSubscription";
    this.http.putAuthenticated(url, null).subscribe((response: any) => {
      this.getProducts();
      this.toastr.success(response.message);
    }, (error: any) => {
      this.toastr.error(error.error.error);
    });
  }
}
