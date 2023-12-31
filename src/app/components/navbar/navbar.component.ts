import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthGuardService } from 'src/app/services/admin-auth-guard.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { NavbarEmitterService, NavbarEmitterType } from 'src/app/services/navbar-emitter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isUserLoggedIn: boolean = false;

  constructor(
    private navbarEmitter: NavbarEmitterService,
    private authGuard: AuthGuardService,
    public adminAuthGuard: AdminAuthGuardService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.isUserLoggedIn = this.checkIfUserIsLoggedIn();
    this.subscribeTooEmitter();
  }

  private checkIfUserIsLoggedIn(): boolean {
    let result = false;
    result = this.authGuard.isTokenPresent();
    return result;
  }

  private subscribeTooEmitter(): void {
    this.navbarEmitter.emitter.subscribe((response: NavbarEmitterType) => {
      if (response === "user-logged-in") {
        this.isUserLoggedIn = true;
      } else if (response === "user-logged-out") {
        this.isUserLoggedIn = false;
      }
    }, (error) => {

    });
  }

  public logOut(): void {
    this.isUserLoggedIn = false;
    this.authGuard.removeToken();
    this.router.navigateByUrl("/");
  }
}
