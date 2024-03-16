import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.css'
})
export class UsersAdminComponent implements OnInit {

  constructor(private httpService: HttpService) {

  }

  ngOnInit(): void {
    this.getUsersPage();
  }

  private getUsersPage(): void {

  }
}