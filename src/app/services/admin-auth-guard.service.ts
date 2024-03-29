import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService  {

  constructor(
    private authGuard: AuthGuardService,
    private router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let result = true;
    const token = this.authGuard.getDecodedToken();
    console.log(token);
    if (!token || token.IsAdmin === "False") {
      result = false;
    }
    return result;
  }

  public isAdmin(): boolean {
    let result = true;
    const token = this.authGuard.getDecodedToken();
    if (!token || token.IsAdmin === "False") {
      result = false;
    }
    return result;
  }
}
