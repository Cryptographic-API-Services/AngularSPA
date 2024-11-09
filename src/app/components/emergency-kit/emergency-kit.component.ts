import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

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

  constructor(private formBuilder: FormBuilder) {

  }

  public ngOnInit(): void {
    this.emgerencyKitForm = this.formBuilder.group({
      emergencyKitSecret: [null]
    });
  }

  public handleSubmit(event: any): void {

  }
}
