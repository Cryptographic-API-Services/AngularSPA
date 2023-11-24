import { Inject, Injectable, OnChanges, OnDestroy, OnInit, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, takeUntil } from 'rxjs';


export class BaseAction<T> {
  type: string;
  payload: T;

  constructor(type: string, payload: T) {
    this.type = type;
    this.payload = payload;
  }
}

export class BaseState<T> {
  
  public patchValue(value: object) {
    Object.assign(this, value);
  }
}

export interface IBaseStore<T> {
  state: Observable<BaseState<T>>;
  dispatcher: Dispatcher<T>;
  onDestroy$: Subject<void>;
  localStorageKey?: string;
}

@Injectable()
export class BaseStore<T> implements IBaseStore<T>, OnDestroy {
  state: BehaviorSubject<BaseState<T>>;
  dispatcher: Dispatcher<T>;
  onDestroy$: Subject<void>;
  localStorageKey?: string;

  constructor(conDispatcher: Dispatcher<T>) {
    this.dispatcher = conDispatcher;
    this.state = new BehaviorSubject<BaseState<T>>(new BaseState<T>());
    this.onDestroy$ = new Subject<void>();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  public setLocalStorage(): void {
    if (!this.localStorageKey) {
      throw new Error(`There is not a localStorageKey set for this store ${this.constructor.toString()}`);
    }
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.state.getValue()));
  }

  public checkForPersistedStorage(): void {
    if (this.localStorageKey) {
      const storedState = localStorage.getItem(this.localStorageKey);
      if (storedState) {
        let parsedJson = JSON.parse(storedState);
        let newStateObject = new BaseState<T>();
        newStateObject.patchValue(parsedJson);
        this.state.next(newStateObject); 
      }
    }
  }

  public getState(): Observable<BaseState<T>> {
    return this.state.asObservable();
  }

  public dispatch(action: BaseAction<T>) {
    this.dispatcher.dispatch(action);
  }
}

@Injectable({
  providedIn: 'root'
})
export class Dispatcher<T> {
  public actionSource = new Subject<BaseAction<T>>();

  constructor() { }

  public dispatch(action: BaseAction<T>) {
    this.actionSource.next(action);
  }
}


export class TestState extends BaseState<TestState> {
  foo?: string;
  bar?: object;

  constructor(foo: string, bar: object) {
    super();
    this.foo = foo;
    this.bar = bar;
  }
}

@Injectable({
  providedIn: 'root'
})
export class TestStoreService extends BaseStore<TestState> {
  
  constructor(conDispatcher: Dispatcher<TestState>) {
    super(conDispatcher);
    this.localStorageKey = 'testing-service';
    this.checkForPersistedStorage();
    this.dispatcher.actionSource.pipe(takeUntil(this.onDestroy$)).subscribe((action: BaseAction<TestState>) => {
      switch (action.type) {
        case 'foo':
          let stateRef: BaseState<TestState> = this.state.getValue();
          stateRef.patchValue({foo: action.payload.foo});
          this.state.next(stateRef);
          break;
        case 'bar':
          let stateRef2: BaseState<TestState> = this.state.getValue();
          stateRef2.patchValue({bar: action.payload.bar});
          this.state.next(stateRef2);
          break;
        case 'local-storage':
          let stateRef3: BaseState<TestState> = this.state.getValue();
          stateRef3.patchValue({bar: action.payload.bar});
          this.state.next(stateRef3);
          this.setLocalStorage();
          break;
      }
    });
  }
}
