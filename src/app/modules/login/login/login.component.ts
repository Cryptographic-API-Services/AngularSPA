import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import LoginUserFormObject from 'src/app/models/LoginUserFormObject';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { HttpService } from 'src/app/services/http.service';
import { NavbarEmitterService } from 'src/app/services/navbar-emitter.service';
import { UserAgentService } from 'src/app/services/user-agent.service';
import { passwordValidator } from 'src/app/validators/form-validators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private apiUrl: string = environment.apiUrl + "UserLogin";
  public isFormValid: boolean = false;
  public isSubmitClicked: boolean = false;
  public isTwoFactorForm: boolean = false;
  public isTwoFactorFormSubmitted: boolean = false;
  private userId: string;

  public loginForm: FormGroup = this.formBuilder.group({
    email: ['',
      [Validators.required, Validators.email]
    ],
    password: ['',
      [Validators.required, passwordValidator]]
  });

  public twoFAForm: FormGroup = this.formBuilder.group({
    code: ['', [Validators.required, Validators.minLength(8)]]
  });


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private router: Router,
    private navbarEmitter: NavbarEmitterService,
    private toastr: ToastrService,
    private authGuard: AuthGuardService,
    private userAgent: UserAgentService, 
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Login | Encryption API Services");
  }

  public handleFormSubmit($event: any) {
    if (this.loginForm.valid && !this.isSubmitClicked) {
      this.isSubmitClicked = true;
      this.isFormValid = true;
      this.http.post(this.apiUrl, this.createFormObject()).subscribe((response: any) => {
        this.toastr.success("", response.message);
        this.isSubmitClicked = false;
        this.loginForm.reset();
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
        if (response.userId) {
          this.userId = response.userId;
        }
        this.isTwoFactorForm = response.TwoFactorAuth;
        this.navbarEmitter.navbarEvents("user-logged-in");
        // check if user has token stored
        if (response.twoFactorAuth === true) {
          this.isTwoFactorForm = true;
        } else {
          this.router.navigate(['/user-home']);
        }
      }, (error) => {
        console.error(error);
        this.toastr.error("", error.error.error);
        this.isSubmitClicked = false;
      })
    } else {
      this.isFormValid = false;
    }
  }

  private createFormObject(): LoginUserFormObject {
    return new LoginUserFormObject(
      this.loginForm.value.email,
      this.loginForm.value.password,
      this.userAgent.getUserAgent()
    );
  }

  public handleEnterPress(event: any): void {
    if (event.keyCode === 13) {
      this.handleFormSubmit(event);
    }
  }


  public handleTwoFactorEnterPress(event: any): void {
    if (event.keyCode === 13) {
      this.twoFactorCodeSubmit(event);
    }
  }


  public twoFactorCodeSubmit(event: any): void {
    if (!this.isTwoFactorFormSubmitted && this.twoFAForm.valid) {
      this.isTwoFactorFormSubmitted = true;
      let body = this.getPutTwoFAVerificationBody();
      this.http.putAuthenticated("UserLogin/ValidateHotpCode", body).subscribe((response: any) => {
        this.isTwoFactorFormSubmitted = false;
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
        this.toastr.success(response.message, "");
        setTimeout(() => {
          this.router.navigate(['/user-home']);
        }, 1500)
      }, (error) => {
        this.isTwoFactorFormSubmitted = false;
        this.toastr.error(error.error.error, "");
      });
    }
  }

  private getPutTwoFAVerificationBody(): object {
    return {
      "UserId": this.userId,
      "HotpCode": this.twoFAForm.value["code"],
      "UserAgent": this.userAgent.getUserAgent()
    }
  }
}
