import { Component, OnInit } from '@angular/core';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(
    private confirmService: ConfirmService
  ) { }

  ngOnInit(): void {
  }


  handleConfirmYesClick() {
    this.confirmService.confirmSubject$.next("yes");
  }
}
