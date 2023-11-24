import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent implements OnInit, OnDestroy {
  routerEvents: Subscription;

  mainNavigation = true;
  productsNavigation = false;
  pricesNavigation = false;

  constructor(
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.routerEvents?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscribeToRouterEvents();
    this.getInitialRoute();
  }

  private getInitialRoute() {
    const url = this.router.url;
    this.handleNavigation(url);
  }

  private subscribeToRouterEvents() {
    this.routerEvents = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.determineNavigation(event);
      }
    });
  }

  private determineNavigation(event: NavigationEnd) {
    const url = event.urlAfterRedirects;
    console.log(url);
    this.handleNavigation(url);
  }

  private handleNavigation(url: string) {
    if (url.includes("/admin-home/payment-products")) {
      this.productsNavigation = true;
      this.mainNavigation = false;
      this.pricesNavigation = false;
    } else if (url.includes("/admin-home/payment-prices")) {
      this.pricesNavigation = true;
      this.mainNavigation = false;
      this.productsNavigation = false;
    } else if (url === "/admin-home") {
      this.mainNavigation = true;
      this.productsNavigation = false;
      this.pricesNavigation = false;
    }
  } 
}
