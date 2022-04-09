import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { firstValueFrom, map, Observable } from "rxjs"
import { AppRouterService } from "src/app/common/services/router.service"
import { ProductAbilities } from "src/app/features/products/product.abilities"
import { ProductsLoaderService } from "src/app/features/products/products-loader.service"
import { Product } from "src/app/features/products/products.interface"
import { ProductsService } from "src/app/features/products/products.service"
import { ConcreteProductDialogsService } from "./concrete-product-dialogs.service"

@Component({
  templateUrl: "./concrete-product.component.html",
  styleUrls: ["./concrete-product.component.scss"]
})
export class ConcreteProductPageComponent implements OnInit {
  product!: Product
  loaded = false

  get updateProductUrl(): string {
    return "/update-product/" + this.product.id
  }

  get productPriceString(): string {
    const hasPrice = this.product.price !== 0
    if (hasPrice) {
      return `${this.product.price} $`
    }
    return "Free"
  }

  constructor(
    private productsService: ProductsService,
    private productsLoader: ProductsLoaderService,
    private currentRoute: ActivatedRoute,
    private productAbilities: ProductAbilities,
    private dialogs: ConcreteProductDialogsService,
    private appRouter: AppRouterService
  ) {}

  async ngOnInit() {
    await this.loadAll()
    this.loaded = true
  }

  async onDelete() {
    const needDelete = await this.dialogs.showConfirmDeleteProduct(this.product.name)
    if (needDelete) {
      await this.deleteProduct()
      this.appRouter.redirectToViewUser(this.product.userId)
    }
  }

  copyUrlToClipboard() {
    const currentUrl = this.getCurrentUrl()
    navigator.clipboard.writeText(currentUrl)
  }

  getLoaderSpinnerDiameter(): number {
    const halfOfWindowWidth = window.innerWidth / 2
    return Math.min(600, halfOfWindowWidth)
  }

  canDeleteProduct(): boolean {
    return this.productAbilities.canDeleteProduct(this.product)
  }

  canUpdateProduct(): boolean {
    return this.productAbilities.canUpdateProduct(this.product)
  }

  private async deleteProduct() {
    return await firstValueFrom(this.productsService.deleteProduct$(this.product.id))
  }

  private getCurrentUrl() {
    return window.location.href
  }

  private async loadAll(): Promise<void> {
    const productId = await firstValueFrom(this.parseProductIdFromUrl)
    const product = await this.loadProduct(productId)

    this.product = product
  }

  private parseProductIdFromUrl: Observable<string> = this.currentRoute.params.pipe(
    map(params => params["id"])
  )

  private async loadProduct(id: string): Promise<Product> {
    const product = await firstValueFrom(this.productsLoader.loadFullProductOrRedirect$(id))
    const productWithDefaultImage = this.addDefaultImageToProduct(product)
    return productWithDefaultImage
  }

  private addDefaultImageToProduct(product: Product): Product {
    const productHasNoImages = product.imagesUrls.length === 0
    if (productHasNoImages) {
      product.imagesUrls.push("assets/pictures/no-image.webp")
    }
    return product
  }
}
