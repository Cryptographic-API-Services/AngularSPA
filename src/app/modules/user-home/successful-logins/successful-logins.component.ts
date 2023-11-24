import { Component, OnInit } from '@angular/core';
import SuccessfulLogins from 'src/app/models/SuccessfulLogins';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-successful-logins',
  templateUrl: './successful-logins.component.html',
  styleUrls: ['./successful-logins.component.css']
})
export class SuccessfulLoginsComponent implements OnInit {
  public successfulLogins: SuccessfulLogins[] = [];
  public totalLogins: number = 0;

  public pageSize: number = 3;
  public pageIndex: number = 0;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getSuccessfulLogins();
  }

  public getSuccessfulLogins(): void {
    this.http.getAuthenticated(environment.apiUrl + `UserLogin/GetSuccessfulLogins?pageSkip=${this.pageIndex}&pageSize=${this.pageSize}`).subscribe((response: any) => {
      this.totalLogins = response.total;
      this.successfulLogins = response.logins;
    }, (error) => {

    });
  }

  public handleWasThisMe(wasThisMe: boolean, loginId: string): void {
    this.http.postAuthenticated(environment.apiUrl + "UserLogin/WasLoginMe", {"LoginId": loginId, "WasMe": wasThisMe}).subscribe((response: any) => {
      this.pageIndex = 0;
      this.getSuccessfulLogins();
    }, (error) => {

    });
  }
  
  public getNewPage(index: number): void {
    this.pageIndex = index - 1;
    this.getSuccessfulLogins();
  }

  public previousPage(): void {
    this.pageIndex = this.pageIndex - 1;
    if (this.pageIndex < 0) {
      this.pageIndex = 0;
    }
    this.getSuccessfulLogins();
  }

  public nextPage(): void {
    this.pageIndex = this.pageIndex + 1;
    if ((this.pageIndex * this.pageSize) > this.totalLogins) {
      this.pageIndex = this.pageIndex - 1;
    } else {
      this.getSuccessfulLogins();
    }
  }

  getPages(): Array<number> {
    let returnArray: Array<number> = [];
    let totalPages = (this.totalLogins / (this.pageSize + 1));
    for (let i = 0; i <= totalPages; i++) {
      returnArray.push(i + 1);
    }
    return returnArray;
  }
}
