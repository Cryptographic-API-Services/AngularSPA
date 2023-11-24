import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InactiveUserRoutingModule } from './inactive-user-routing.module';
import { InactiveUserComponent } from './inactive-user/inactive-user.component';


@NgModule({
  declarations: [
    InactiveUserComponent
  ],
  imports: [
    CommonModule,
    InactiveUserRoutingModule
  ]
})
export class InactiveUserModule { }
