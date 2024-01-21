import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthGuardService } from 'src/app/services/admin-auth-guard.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { NavbarStoreService } from 'src/app/shared/stores/navbar-store.service';
import NavbarStoreState from 'src/app/shared/stores/state/navbar-store-state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isUserLoggedIn: boolean = false;

  constructor(
    private navbarEmitter: NavbarStoreService,
    private authGuard: AuthGuardService,
    public adminAuthGuard: AdminAuthGuardService,
    private navbarStore: NavbarStoreService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.checkIfUserIsLoggedIn();
    this.subscribeTooEmitter();
  }

  private checkIfUserIsLoggedIn(): boolean {
    return this.authGuard.isTokenPresent();
  }

  private subscribeTooEmitter(): void {
    this.navbarEmitter.store.subscribe((response: NavbarStoreState) => {
      if (response.userLoggedInOrOut === "user-logged-in") {
        this.isUserLoggedIn = true;
      } else if (response.userLoggedInOrOut === "user-logged-out") {
        this.isUserLoggedIn = false;
      }
    });
  }

  public logOut(): void {
    this.isUserLoggedIn = false;
    this.authGuard.removeToken();
    this.router.navigateByUrl("/");
  }
}
