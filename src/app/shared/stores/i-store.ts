import { BehaviorSubject } from "rxjs";

export interface IStore<T> {
    store: BehaviorSubject<T>;
    getState: T;
}