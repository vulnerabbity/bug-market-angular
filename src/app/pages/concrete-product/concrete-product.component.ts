import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { map, Observable, take } from "rxjs"
import { ProductsService } from "src/app/features/products/products.service"
import { Product } from "src/generated-gql-types"

@Component({
  templateUrl: "./concrete-product.component.html",
  styleUrls: ["./concrete-product.component.scss"]
})
export class ConcreteProductPageComponent implements OnInit {
  product!: Product
  loaded = false

  get productPriceString(): string {
    const hasPrice = this.product.price !== 0
    if (hasPrice) {
      return `${this.product.price} $`
    }
    return "Free"
  }

  constructor(private productsService: ProductsService, private currentRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.parseProductIdFromUrl.subscribe(id => this.loadProduct(id))
  }

  copyUrlToClipboard() {
    const currentUrl = this.getCurrentUrl()
    navigator.clipboard.writeText(currentUrl)
  }

  private getCurrentUrl() {
    return window.location.href
  }

  private parseProductIdFromUrl: Observable<string> = this.currentRoute.params.pipe(
    map(params => params["id"]),
    take(1)
  )

  private loadProduct(id: string): void {
    this.productsService.loadFullProduct(id).subscribe(loadedProduct => {
      const productHasNoImages = loadedProduct.imagesUrls.length === 0
      if (productHasNoImages) {
        loadedProduct.imagesUrls.push("assets/pictures/no-image.webp")
      }
      this.product = loadedProduct
      this.loaded = true
    })
  }
}
