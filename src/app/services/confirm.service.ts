import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ConfirmType = 'yes' | 'no';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  public confirmSubject$: Subject<ConfirmType> = new Subject<ConfirmType>();  

  constructor() { }
}
