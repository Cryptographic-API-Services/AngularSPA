import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { UserTableItem } from './types/user-table-item';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.css'
})
export class UsersAdminComponent implements OnInit {

  private pageIndex: number = 0;
  private pageSize: number = 5;
  public userList: UserTableItem[];
  public count: number = 0;

  constructor(private httpService: HttpService) {

  }

  ngOnInit(): void {
    this.getUsersPage();
  }

  private getUsersPage(): void {
    this.httpService.getAuthenticated(environment.apiUrl + `/UserAdmin/GetUsers?PageSkip=${this.pageIndex}&PageSize=${this.pageSize}`).subscribe((response: any) => {
      this.userList = response.userTableItems;
      this.count = response.count;
    });
  }

  public makeUserInactive(user: UserTableItem): void {
    let body = {
      UserId: user.userId,
      IsActive: false
    };
    this.httpService.putAuthenticated(environment.apiUrl + "/UserAdmin/UserActivationStatus", body).subscribe(() => {
      user.isActive = false;
    });
  }

  public makeUserActive(user: UserTableItem): void {
    let body = {
      UserId: user.userId,
      IsActive: true
    };
    this.httpService.putAuthenticated(environment.apiUrl + "/UserAdmin/UserActivationStatus", body).subscribe(() => {
      user.isActive = true;
    });
  }

  public makeUserRegularUser(user: UserTableItem): void {
    let body = {
      UserId: user.userId,
      IsAdmin: false
    };
    this.httpService.putAuthenticated(environment.apiUrl + "/UserAdmin/UserAdminStatus", body).subscribe(() => {
      user.isAdmin = false;
    });
  }

  public makeUserAdmin(user: UserTableItem): void {
    let body = {
      UserId: user.userId,
      IsAdmin: true
    };
    this.httpService.putAuthenticated(environment.apiUrl + "/UserAdmin/UserAdminStatus", body).subscribe(() => {
      user.isAdmin = true;
    });
  }

  public deleteUser(user: UserTableItem): void {
    let body = { UserId: user.userId };
    this.httpService.deleteAuthenticated(environment.apiUrl + "/UserAdmin/UserDelete", body).subscribe(() => {
      this.userList.splice(this.userList.findIndex(x => x.userId === user.userId), 1);
    });
  }
}