import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inactive-user',
  templateUrl: './inactive-user.component.html',
  styleUrls: ['./inactive-user.component.css']
})
export class InactiveUserComponent implements OnInit {
  private apiUrl: string = environment.apiUrl + "UserRegister/InactiveUser";

  public isDeleting: boolean = true;
  public wasDeleteSuccessful: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.sendInactiveUserRequestToServer();
  }
  
  private sendInactiveUserRequestToServer() {
    const id = this.activeRoute.snapshot.queryParamMap.get("id");
    const token = this.activeRoute.snapshot.queryParamMap.get("token");
    const body = {
      token: token,
      id: id
    };
    this.httpService.post(this.apiUrl, body).subscribe((response) => {
      this.isDeleting = false;
      this.wasDeleteSuccessful = true;
    }, (error) => {
      this.isDeleting = false;
      this.wasDeleteSuccessful = false;
    });
  }
}
