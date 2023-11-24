import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-product-create',
  templateUrl: './payment-product-create.component.html',
  styleUrls: ['./payment-product-create.component.css']
})
export class PaymentProductCreateComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpService
    ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productInput: ['', Validators.required]
    });
  }

  submitProductForm() {
    if (this.productForm.valid) {
      const url = environment.apiUrl + "Payments/CreateProduct";
      this.http.postAuthenticated(url, { productName: this.productForm.value.productInput }).subscribe((response: any) => {
        this.productForm.reset();
        this.toastr.success(response.message);
      }, (error) => {
        this.toastr.error(error.error.error);
      });
    } else {
      this.toastr.warning("Please enter a product name");
    }
  }

}
