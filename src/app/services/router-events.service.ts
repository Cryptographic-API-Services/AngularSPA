import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterEventsService {
  public urlAfterRedirectsSubject: Subject<string> = new Subject<string>(); 

  constructor() { 
    
  }
}
