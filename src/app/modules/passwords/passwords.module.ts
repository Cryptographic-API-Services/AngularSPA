import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordsRoutingModule } from './passwords-routing.module';
import { PasswordToolComponent } from './password-tool/password-tool.component';


@NgModule({
  declarations: [
    PasswordToolComponent
  ],
  imports: [
    CommonModule,
    PasswordsRoutingModule
  ]
})
export class PasswordsModule { }
