import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AppPreloadingStrategy } from './app-preloading-strategy';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: () => import(`./modules/home/home.module`).then(m => m.HomeModule), data: { preload: true, delay: 5000 } },
  { path: "register", loadChildren: () => import(`./modules/register/register.module`).then(module => module.RegisterModule), data: { preload: true, delay: 5000 } },
  { path: "login", loadChildren: () => import(`./modules/login/login.module`).then(module => module.LoginModule), data: { preload: true, delay: 5000 } },
  { path: "activate", loadChildren: () => import(`./modules/activate/activate.module`).then(module => module.ActivateModule), data: { preload: true, delay: 5000 } },
  { path: "user-home", loadChildren: () => import(`./modules/user-home/user-home.module`).then(module => module.UserHomeModule), canActivate: [AuthGuardService], data: { preload: true, delay: 5000 } },
  { path: "forgot-password", loadChildren: () => import(`./modules/forgot-password/forgot-password.module`).then(module => module.ForgotPasswordModule), data: { preload: true, delay: 5000 } },
  { path: "admin-home", loadChildren: () => import(`./modules/admin-home/admin-home.module`).then(module => module.AdminHomeModule), data: { preload: true, delay: 5000 } },
  { path: "passwords", loadChildren: () => import(`./modules/passwords/passwords.module`).then(m => m.PasswordsModule), data: { preload: true, delay: 5000 } },
  { path: "inactive-user", loadChildren: () => import(`./modules/inactive-user/inactive-user.module`).then(m => m.InactiveUserModule), data: { preload: true, delay: 5000 } },
  { path: "unlock-account", loadChildren: () => import(`./modules/unlock-account/unlock-account.module`).then(m => m.UnlockAccountModule), data: { preload: true, delay: 5000 } },
  { path: "**", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: AppPreloadingStrategy })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
