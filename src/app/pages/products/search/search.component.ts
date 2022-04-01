import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from "@angular/core"
import {
  debounce,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  Subscription,
  timer
} from "rxjs"

@Component({
  selector: "products-page-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class ProductsPageSearchComponent implements OnDestroy, AfterViewInit {
  @Output()
  onSearch = new EventEmitter<string>()

  @Input()
  initialSearch = ""

  @ViewChild("searchInput", { static: true })
  searchInput!: ElementRef

  search$!: Observable<string>

  ngAfterViewInit(): void {
    this.initSearch()
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe()
  }

  private searchSub!: Subscription

  private initSearch() {
    this.initSearchObservable()
    this.setSearchDebounce(500)
    this.setSearchDistinctUntilChanged()

    this.searchSub = this.search$.subscribe(searchText => {
      this.onSearch.next(searchText)
    })
  }

  private initSearchObservable() {
    this.search$ = fromEvent<{ target: { value: string } }>(
      this.searchInput.nativeElement,
      "input"
    ).pipe(map(element => element.target.value))
  }

  private setSearchDebounce(time = 1000) {
    this.search$ = this.search$.pipe(debounce(() => timer(time)))
  }

  private setSearchDistinctUntilChanged() {
    this.search$ = this.search$.pipe(distinctUntilChanged())
  }
}
