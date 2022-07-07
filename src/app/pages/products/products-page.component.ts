import { Component, OnDestroy, OnInit } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { ProductsLoaderService } from "src/app/features/products/products-loader.service"
import { ShortProduct } from "src/app/features/products/products.interface"
import { ProductFilters, ProductSorting, SortingOrder } from "src/generated-gql-types"
import { ProductSidebarFilters } from "./filters/filters-sidebar.component"

@Component({
  templateUrl: "./products-page.component.html",
  styleUrls: ["./product-page.component.scss"]
})
export class ProductsPageComponent implements OnInit {
  pageIndex = 0
  pageSize = 24
  totalProducts = 0

  products: ShortProduct[] = []

  searchText = ""

  sorting: ProductSorting = { createdAt: SortingOrder.Descending }

  filters: ProductFilters = {}

  constructor(private productsLoader: ProductsLoaderService) {}

  ngOnInit(): void {
    this.loadProducts()
  }

  hasNextPage() {
    return this.totalProducts > this.pageSize
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

    if (priceSorting === "NO_SORTING") {
      this.sorting.price = undefined
    } else {
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
      ;(this.products = paginatedProducts.data),
        (this.totalProducts = paginatedProducts.totalResultsCount)
    })
  }

  private makeProductsRequest$() {
    return this.productsLoader.loadShortProductsOrRedirect$({
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
