// deno-lint-ignore-file no-inferrable-types
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import RegisterUserFormObject from 'src/app/models/RegisterUserFormObject';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { passwordValidator, usernameValidator } from "../../../validators/form-validators";
import { COUNTRY_MAP } from './register.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private apiUrl: string = environment.apiUrl + "UserRegister";
  public isFormValid: boolean = false;
  public isSubmitClicked: boolean = false; 
  public wasFirstFormCompleted: boolean = false;
  public countries = COUNTRY_MAP;

  public registerForm: FormGroup = this.formBuilder.group({
    email: ['',
      [Validators.required, Validators.email]
    ],
    username: ['', 
      [Validators.required, usernameValidator]],
    password: ['', 
      [Validators.required, passwordValidator]]
  });
  public addressForm: FormGroup = this.formBuilder.group({
    addressOne: ['', Validators.required],
    addressTwo: [''],
    city: ['', Validators.required],
    state: ['', ],
    zip: [''],
    country: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpService,
    private toastr: ToastrService,
    private title: Title,
    private router: Router
    ) {}


  ngOnInit(): void {
    this.title.setTitle("Register | Cryptographic API Services");
  }

  handleStateSelection(event: any) {
    this.addressForm.patchValue({
      state: event.target.value
    });
  }

  handleCountySelection(event: any) {
    this.addressForm.patchValue({
      country: event.target.value
    });
  }

  public handleFormSubmit($event: any) {
    if (!this.isSubmitClicked && !this.wasFirstFormCompleted && this.registerForm.valid) {
      this.wasFirstFormCompleted = true;
      return;
    }

    if (!this.isSubmitClicked && this.registerForm.valid && this.addressForm.valid) {
      this.isSubmitClicked = true;
      this.isFormValid = true;
      this.http.post(this.apiUrl, this.createFormObject()).subscribe((response: any) => {
        this.toastr.success("", response.message);
        this.registerForm.reset();
        this.isSubmitClicked = false;
        this.router.navigate(['/login']);
      }, (error) => {
        this.toastr.error("", error.error.error);
        this.isSubmitClicked = false;
      })
    } else if (!this.registerForm.valid || !this.addressForm.valid) {
      this.toastr.warning("", "You must have all required fields filled out correctly to submit this form.");
      this.isFormValid = false;
    } else {
      console.log('nope');
      this.isFormValid = false;
    } 
  }

  public handleEnterPress(event: any): void {
    if (event.keyCode === 13) {
      this.handleFormSubmit(event);
    }
  }

  private createFormObject(): RegisterUserFormObject {
    return new RegisterUserFormObject( 
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.addressForm.value.addressOne,
      this.addressForm.value.addressTwo,
      this.addressForm.value.city,
      this.addressForm.value.state,
      this.addressForm.value.zip,
      this.addressForm.value.country
    );
  }
}
