import { Component, OnDestroy, OnInit } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { ShortProduct } from "src/app/features/products/products.interface"
import { ProductsService } from "src/app/features/products/products.service"
import { ProductFilters, ProductSorting, SortingOrder } from "src/generated-gql-types"
import { ProductSidebarFilters } from "./filters/filters-sidebar.component"

@Component({
  templateUrl: "./products-page.component.html",
  styleUrls: ["./product-page.component.scss"]
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  pageIndex = 0
  pageSize = 24
  totalProducts = 0

  products$ = new BehaviorSubject<ShortProduct[]>([])

  searchText = ""

  sorting: ProductSorting = {}

  filters: ProductFilters | undefined = undefined

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts()
  }

  ngOnDestroy(): void {
    this.products$.unsubscribe()
  }

  onSearch(searchText: string) {
    this.searchText = searchText
    this.pageIndex = 0
    this.loadProducts()
  }

  onPaginationUpdate(page: number) {
    this.pageIndex = page - 1
    this.loadProducts()
  }

  // TODO: Refactoring
  onFiltersApply($productFilters: ProductSidebarFilters) {
    const { category, priceSorting, priceRange } = $productFilters
    this.filters = {}

    if (priceSorting !== "NO_SORTING") {
      this.sorting.price = priceSorting as SortingOrder
    }

    if (priceRange) {
      this.filters.priceRange = priceRange
    }

    if (category) {
      this.filters.categoryName = category.databaseName
    }

    this.loadProducts()
  }

  private loadProducts() {
    const productsRequest = this.makeProductsRequest$()
    productsRequest.subscribe(paginatedProducts => {
      this.products$.next(paginatedProducts.data)
      this.totalProducts = paginatedProducts.totalResultsCount
    })
  }

  private makeProductsRequest$() {
    return this.productsService.loadShortProducts$({
      pagination: {
        offset: this.pageSize * this.pageIndex,
        limit: this.pageSize
      },
      sorting: this.sorting,
      filtering: this.filters,
      fuzzy: this.searchText
    })
  }
}
