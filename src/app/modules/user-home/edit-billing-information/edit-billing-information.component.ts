import { Component, OnInit } from '@angular/core';
import { COUNTRY_MAP } from '../../register/register/register.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'app-edit-billing-information',
  templateUrl: './edit-billing-information.component.html',
  styleUrls: ['./edit-billing-information.component.css']
})
export class EditBillingInformationComponent implements OnInit {

  public countries = COUNTRY_MAP;
  public addressForm: FormGroup;
  public isSubmitClicked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private http: HttpService
    ) { }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      addressOne: ['', Validators.required], 
      addressTwo: [''],
      city: ['', Validators.required],
      state: [''],
      zip: [''],
      country: ['', Validators.required],  
    });
    this.getBillingInformation();
  }

  private getBillingInformation() {
    const url = environment.apiUrl + "Payments/GetBillingInformation";
    this.http.getAuthenticated(url).subscribe((response: any) => {
      this.addressForm.patchValue({
        addressOne: response.billingInformation.addressOne,
        addressTwo: response.billingInformation.addressTwo,
        city: response.billingInformation.city,
        state: response.billingInformation.state,
        zip: response.billingInformation.zip,
        country: response.billingInformation.country
      });
    });
  }

  public handleCountySelection(event: any) {
    this.addressForm.patchValue({
      country: event.target.value
    });
  }

  handleStateSelection(event: any) {
    this.addressForm.patchValue({
      state: event.target.value
    });
  }

  public handleFormSubmit(event: any) {
    if (this.addressForm.valid) {
      const url = environment.apiUrl + "Payments/UpdateBillingInformation";
      this.http.putAuthenticated(url, this.createFormObject()).subscribe((response: any) => {
        this.toastr.success('Billing information updated successfully');
      }, (error) => {
        this.toastr.error('An error occurred while updating billing information');
      });
    } else {
      this.toastr.error('Please fill all the required fields');
    }
  }

  private createFormObject() {
    return {
      addressOne: this.addressForm.value.addressOne,
      addressTwo: this.addressForm.value.addressTwo,
      city: this.addressForm.value.city,
      state: this.addressForm.value.state,
      zip: this.addressForm.value.zip,
      country: this.addressForm.value.country 
    };
  }
}
