import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavbarEmitterType } from './actions/navbar-store-actions';
import { IStore } from './i-store';
import NavbarStoreState from './state/navbar-store-state';


@Injectable({
  providedIn: 'root'
})
export class NavbarStoreService implements IStore<NavbarStoreState> {

  public store: BehaviorSubject<NavbarStoreState> = new BehaviorSubject<NavbarStoreState>(new NavbarStoreState());

  get getState(): NavbarStoreState {
    return this.store.getValue();
  }


  constructor() { }

  public navbarEvents(actionType: NavbarEmitterType, newState?: NavbarStoreState): void {
    switch (actionType) {
      case "user-logged-in":
        this.userLoggedInOrOut(actionType);
        break;
      case "user-logged-out":
        this.userLoggedInOrOut(actionType);
        break;
    }
  }

  private userLoggedInOrOut(actionType: NavbarEmitterType): void  {
    const currentState: NavbarStoreState = this.getState;
    currentState.userLoggedInOrOut = actionType;
    this.store.next(currentState);
  }
}
