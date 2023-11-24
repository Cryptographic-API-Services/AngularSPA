import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserHomeRoutingModule } from './user-home-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TwoFactorAuthenticationComponent } from './two-factor-authentication/two-factor-authentication.component';
import { SuccessfulLoginsComponent } from './successful-logins/successful-logins.component';
import { PaymentInformationComponent } from './payment-information/payment-information.component';
import { UserHomeNavigationComponent } from './user-home-navigation/user-home-navigation.component';
import { ApiKeyComponent } from './api-key/api-key.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { ProductsSelectionComponent } from './products/products-selection.component';
import { EditBillingInformationComponent } from './edit-billing-information/edit-billing-information.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';


@NgModule({
  declarations: [
    UserHomeComponent,
    TwoFactorAuthenticationComponent,
    SuccessfulLoginsComponent,
    PaymentInformationComponent,
    UserHomeNavigationComponent,
    ApiKeyComponent,
    ProductsSelectionComponent,
    EditBillingInformationComponent,
    UserSettingsComponent
  ],
  imports: [
    CommonModule,
    UserHomeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UserHomeModule { }
