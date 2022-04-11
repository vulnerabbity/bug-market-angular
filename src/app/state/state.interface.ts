export interface State<T> {
  getItem(): T | null
  setItem(input: T): void
}
