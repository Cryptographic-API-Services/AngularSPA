import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterEventsService } from "./services/router-events.service";
import { AuthGuardService } from "./services/auth-guard.service";
import { HttpService } from "./services/http.service";
import { environment } from "src/environments/environment";

declare let gtag: Function;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public isInitialLoad: boolean = true;

  constructor(
    private router: Router,
    private routerEventsService: RouterEventsService,
    private authGuardService: AuthGuardService,
    private httpService: HttpService,
  ) {}

  ngOnInit(): void {
    this.setUpRouterEvents();
  }

  private setUpRouterEvents() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.isInitialLoad) {
          this.isInitialLoad = false;
          this.isValidUserOnHomePage(event.urlAfterRedirects);
        }
        this.routerEventsService.urlAfterRedirectsSubject.next(
          event.urlAfterRedirects,
        );
        gtag("event", "page_view", { "page_path": event.urlAfterRedirects });
      }
    });
  }

  /**
   * If the user is on the home page and has a valid token, then the user is redirected to the dashboard.
   */
  private isValidUserOnHomePage(url: string): void {
    if (url === "/" || url === "/home") {
      const token = this.authGuardService.getToken();
      if (token) {
        const url = environment.apiUrl + "Token/IsTokenValid";
        this.httpService.getAuthenticated(url).subscribe((response: any) => {
          this.router.navigate(["/user-home"]);
        }, (error) => {
          // do nothing
        });
      }
    }
  }
}
