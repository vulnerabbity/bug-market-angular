import { Component, OnDestroy, OnInit } from "@angular/core"
import { PageEvent } from "@angular/material/paginator"
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
  pageSize = 25
  totalProducts = 0
  pageSizeOptions = [10, 25, 50]

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
    this.loadProducts()
  }

  onPaginationUpdate({ pageSize, pageIndex }: PageEvent) {
    this.pageSize = pageSize
    this.pageIndex = pageIndex
    this.loadProducts()
  }

  // TODO: Refactoring
  onFiltersApply($productFilters: ProductSidebarFilters) {
    const { category, priceSorting, priceRange } = $productFilters

    if (priceSorting !== "NO_SORTING") {
      this.sorting.price = priceSorting as SortingOrder
    }

    if (priceRange) {
      this.filters = { priceRange }
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
