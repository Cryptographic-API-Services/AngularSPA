import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export type ConfirmType = "yes" | "no";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  @Output()
  confirmOutput: EventEmitter<ConfirmType> = new EventEmitter<ConfirmType>();

  constructor() { }

  ngOnInit(): void {
  }


  handleConfirmYesClick() {
    this.confirmOutput.next("yes");
  }
}
