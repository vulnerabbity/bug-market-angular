import { BehaviorSubject, Observable } from "rxjs"

export interface ReactiveState<T> {
  subject$: BehaviorSubject<T>

  item$: Observable<T>

  setItem(input: T): void
}
