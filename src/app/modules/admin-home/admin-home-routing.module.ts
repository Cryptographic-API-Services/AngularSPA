import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PaymentProductsComponent } from './payments/payment-products/payment-products.component';
import { AdminAuthGuardService } from 'src/app/services/admin-auth-guard.service';
import { PaymentSubscriptionComponent } from './payments/payment-subscription/payment-subscription.component';
import { PaymentPricesComponent } from './payments/payment-prices/payment-prices.component';
import { PaymentProductCreateComponent } from './payments/payment-product-create/payment-product-create.component';
import { PaymentPriceCreateComponent } from './payments/payment-price-create/payment-price-create.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';

const routes: Routes = [
  {
    path: "", component: AdminHomeComponent, canActivate: [AdminAuthGuardService],
    children:
      [
        { path: "payment-products", component: PaymentProductsComponent, canActivate: [AdminAuthGuardService] },
        { path: "payment-products/create", component: PaymentProductCreateComponent, canActivate: [AdminAuthGuardService] },
        { path: "payment-prices", component: PaymentPricesComponent, canActivate: [AdminAuthGuardService] },
        { path: "payment-prices/create", component: PaymentPriceCreateComponent, canActivate: [AdminAuthGuardService] },
        { path: "payment-subscription", component: PaymentSubscriptionComponent, canActivate: [AdminAuthGuardService] },
        { path: "users-admin", component: UsersAdminComponent, canActivate: [AdminAuthGuardService] }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRoutingModule { }
