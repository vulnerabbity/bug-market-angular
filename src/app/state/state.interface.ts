import { BehaviorSubject, Observable } from "rxjs"

export interface ReactiveState<T> {
  subject$: BehaviorSubject<T | null>

  item$: Observable<T | null>

  setItem(input: T): void
}
