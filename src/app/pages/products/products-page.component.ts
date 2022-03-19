import { Component, OnInit } from "@angular/core"
import { PageEvent } from "@angular/material/paginator"
import { BehaviorSubject } from "rxjs"
import { ShortProduct } from "src/app/features/products/products.interface"
import { ProductsService } from "src/app/features/products/products.service"

@Component({
  templateUrl: "./products-page.component.html",
  styleUrls: ["./product-page.component.scss"]
})
export class ProductsPageComponent implements OnInit {
  pageIndex = 0
  pageSize = 25
  totalProducts = 0
  pageSizeOptions = [10, 25, 50]

  products$ = new BehaviorSubject<ShortProduct[]>([])

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts()
  }

  onPaginationUpdate({ pageSize, pageIndex }: PageEvent) {
    this.pageSize = pageSize
    this.pageIndex = pageIndex
    this.loadProducts()
  }

  private loadProducts() {
    const productsRequest = this.makeProductsRequest()
    productsRequest.subscribe(paginatedProducts => {
      this.products$.next(paginatedProducts.data)
      this.totalProducts = paginatedProducts.totalResultsCount
    })
  }

  private makeProductsRequest() {
    return this.productsService.loadShortProducts({
      pagination: {
        offset: this.pageSize * this.pageIndex,
        limit: this.pageSize
      }
    })
  }
}
