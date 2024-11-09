import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-emergency-kit',
  standalone: true,
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  templateUrl: './emergency-kit.component.html',
  styleUrl: './emergency-kit.component.css'
})
export class EmergencyKitComponent implements OnInit {

  public emgerencyKitForm: FormGroup;
  public hasFormBeenSubmitted: boolean = false;
  public hasKitBeenRecovered: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private toastService: ToastrService
  ) {

  }

  public ngOnInit(): void {
    this.emgerencyKitForm = this.formBuilder.group({
      email: [''],
      emergencyKitSecret: ['']
    });
  }

  public handleSubmit(event: any): void {
    this.hasFormBeenSubmitted = true;
    let body = {
      Secret: this.emgerencyKitForm.get('emergencyKitSecret')?.value,
      Email: this.emgerencyKitForm.get('email')?.value
    };
    this.httpClient.post(environment.apiUrl + "EmergencyKit/RecoverProfile", body).subscribe((response) => {
      this.hasFormBeenSubmitted = false;
      this.hasKitBeenRecovered = true;
      console.log(response);
    }, (error) => {
      console.log(error);
      this.hasFormBeenSubmitted = false;
      this.hasKitBeenRecovered = false;
      this.toastService.warning(error.error.error);
    });
  }
}
