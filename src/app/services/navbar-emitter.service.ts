import { EventEmitter, Injectable } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';

export type NavbarEmitterType = "user-logged-in" | "user-logged-out";

@Injectable({
  providedIn: 'root'
})
export class NavbarEmitterService {

  public emitter: EventEmitter<NavbarEmitterType> = new EventEmitter<NavbarEmitterType>();

  constructor(private authGuard: AuthGuardService) { }

  public navbarEvents(event: NavbarEmitterType): void {
    this.emitter.emit(event);
  }
}
