import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { PaymentProductsComponent } from './payments/payment-products/payment-products.component';
import { PaymentPricesComponent } from './payments/payment-prices/payment-prices.component';
import { PaymentSubscriptionComponent } from './payments/payment-subscription/payment-subscription.component';
import { PaymentProductCreateComponent } from './payments/payment-product-create/payment-product-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentPriceCreateComponent } from './payments/payment-price-create/payment-price-create.component';


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminNavigationComponent,
    AdminNavigationComponent,
    PaymentProductsComponent,
    PaymentPricesComponent,
    PaymentSubscriptionComponent,
    PaymentProductCreateComponent,
    PaymentPriceCreateComponent
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminHomeModule { }
