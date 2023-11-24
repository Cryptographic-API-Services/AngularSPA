import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ConfirmService, ConfirmType } from 'src/app/services/confirm.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-home-navigation',
  templateUrl: './user-home-navigation.component.html',
  styleUrls: ['./user-home-navigation.component.css']
})
export class UserHomeNavigationComponent implements OnInit, OnDestroy {
  private confirmDeleteSubscription: Subscription;

  constructor(
    private httpService: HttpService,
    private toast: ToastrService,
    private router: Router,
    private authGuardService: AuthGuardService,
    private confirmService: ConfirmService
    ) { }

  ngOnDestroy(): void {
    this.confirmDeleteSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.confirmDeleteSubscription = this.confirmService.confirmSubject$.subscribe((confirmType: ConfirmType) => {
      if (confirmType === "yes") {
        this.handleDeleteUserAccount();
      }
    });
  }


  handleDeleteUserAccount() {
    const url: string = environment.apiUrl + "UserRegister/DeleteUser";
    this.httpService.deleteAuthenticated(url, {}).subscribe((response: any) => {
      this.toast.success("", "Deleted User Account");
      this.authGuardService.removeToken();
      this.router.navigate(["/"]);
    }, (error) => {
      this.toast.error("", error.error.error);
    });
  }
}
