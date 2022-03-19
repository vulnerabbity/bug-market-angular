import { Component } from "@angular/core"
import { PageEvent } from "@angular/material/paginator"
import { ShortProduct } from "src/app/features/products/products.interface"
import { ProductsService } from "src/app/features/products/products.service"

@Component({
  templateUrl: "./products-page.component.html",
  styleUrls: ["./product-page.component.scss"]
})
export class ProductsPageComponent {
  products: ShortProduct[] = []
  pageIndex = 0
  pageSize = 25
  totalProducts = 0
  pageSizeOptions = [10, 25, 50]

  constructor(private productsService: ProductsService) {
    this.loadProducts()
  }

  onPaginationUpdate({ pageSize, pageIndex }: PageEvent) {
    this.pageSize = pageSize
    this.pageIndex = pageIndex
    this.loadProducts()
  }

  private loadProducts() {
    const offset = this.pageSize * this.pageIndex
    this.productsService
      .loadShortProducts({
        pagination: {
          offset,
          limit: this.pageSize
        }
      })
      .subscribe(paginatedProducts => {
        this.products = paginatedProducts.data
        this.totalProducts = paginatedProducts.totalResultsCount
      })
  }
}
