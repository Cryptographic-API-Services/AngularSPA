import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { passwordValidator, usernameValidator } from 'src/app/validators/form-validators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  public userNameForm: FormGroup;
  public userPasswordForm: FormGroup;
  public isNewUsernameSubmitted: boolean = false;
  public isNewPasswordSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private httpService: HttpService
    ) { }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.userNameForm = this.formBuilder.group({
      username: ['', [usernameValidator]],
    });

    this.userPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, passwordValidator]],
      confirmNewPassword: ['', [Validators.required, passwordValidator]],
      currentPassword: ['', [Validators.required, passwordValidator]]
    });
  }

  public handle2FAChange(event: any) {
    let isChecked: boolean = event.target.checked;
  } 

  public newUsernameSubmit(): void {
    if (this.userNameForm.valid) {
      this.isNewUsernameSubmitted = true;
      const url = environment.apiUrl + "UserSettings/Username";
      const body = {
        NewUsername: this.userNameForm.value.username
      };
      this.httpService.putAuthenticated(url, body).subscribe((response: any) => {
        this.isNewUsernameSubmitted = false;
        this.userNameForm.reset();
        this.toastService.success("", response.message);
      }, (error) => {
        this.isNewUsernameSubmitted = false;
        this.toastService.warning("", error.error.error);
      });
    } else {
      this.isNewUsernameSubmitted = false;
      this.toastService.warning("", "Username must be 6-16 characters long and can contain only letters and numbers");
    }
  }

  public submitNewPasswordForm(): void {
    if (!this.isNewPasswordSubmitted) {
      this.isNewPasswordSubmitted = true;
      if (!this.userPasswordForm.get('newPassword')?.valid) {
        this.toastService.warning("", "New Password must be 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character");
        this.isNewPasswordSubmitted = false;
      } else if (!this.userPasswordForm.get('confirmNewPassword')?.valid) {
        this.toastService.warning("", "Confirm New Password must match your new password");
        this.isNewPasswordSubmitted = false;
      } else if (!this.userPasswordForm.get('currentPassword')?.valid) {
        this.toastService.warning("", "Current Password must be 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character");
        this.isNewPasswordSubmitted = false;
      } else if (this.userPasswordForm.value.newPassword !== this.userPasswordForm.value.confirmNewPassword) {
        this.toastService.warning("", "New Password and Confirm New Password must match");
        this.isNewPasswordSubmitted = false;
      } else if (this.userPasswordForm.value.newPassword === this.userPasswordForm.value.currentPassword) {
        this.toastService.warning("", "Your new password cannot be the same as your current password");
        this.isNewPasswordSubmitted = false;
      } else {
        const url = environment.apiUrl + "UserSettings/Password";
        const body = {
          NewPassword: this.userPasswordForm.value.newPassword,
          CurrentPassword: this.userPasswordForm.value.currentPassword
        };
        this.httpService.putAuthenticated(url, body).subscribe((response: any) => {
          this.isNewPasswordSubmitted = false;
          this.userPasswordForm.reset();
          this.toastService.success("", response.message);
        }, (error) => {
          this.isNewPasswordSubmitted = false;
          this.toastService.warning("", error.error.error);
        });
      }
    }
  }
}
