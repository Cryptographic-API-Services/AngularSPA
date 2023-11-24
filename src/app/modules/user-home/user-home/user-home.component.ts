import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterEventsService } from 'src/app/services/router-events.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit, OnDestroy {
  private routerEventsSubscription: Subscription;
  public shouldDisplaySuccessfulLogins: boolean = true;

  constructor(
    private router: Router,
    private routerEventsService: RouterEventsService
    ) { }
  
  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.shouldDisplaySuccesfulLogins(this.router.url);
    this.routerEventsSubscription = this.routerEventsService.urlAfterRedirectsSubject.subscribe((url: string) => {
      this.shouldDisplaySuccesfulLogins(url);
    });
  }

  private shouldDisplaySuccesfulLogins(url: string): void {
    let result = true;
    if (url !== "/user-home") {
      result = false;
    }
    this.shouldDisplaySuccessfulLogins = result;
  }
}
