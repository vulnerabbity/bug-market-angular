import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { firstValueFrom, map, Observable } from "rxjs"
import { ProductCategoriesService } from "src/app/features/categories/categories.service"
import { ProductAbilities } from "src/app/features/products/product.abilities"
import { Product } from "src/app/features/products/products.interface"
import { ProductsService } from "src/app/features/products/products.service"
import { userDefaults } from "src/app/features/users/user.defaults"
import { User } from "src/app/features/users/users.interface"
import { UsersService } from "src/app/features/users/users.service"

@Component({
  templateUrl: "./concrete-product.component.html",
  styleUrls: ["./concrete-product.component.scss"]
})
export class ConcreteProductPageComponent implements OnInit {
  product!: Product
  user!: User
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

  get userNameOrDefault(): string {
    if (this.user.name) {
      return this.user.name
    }
    return userDefaults.name
  }

  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    private currentRoute: ActivatedRoute,
    private productAbilities: ProductAbilities,
    private categoriesService: ProductCategoriesService
  ) {}

  async ngOnInit() {
    await this.loadAll()
    this.loaded = true
  }

  onDelete() {
    // TODO: Show confirmation
    this.deleteProduct()
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

  hasDescription() {
    const trimmedDescription = this.product.description?.trim()
    const hasDescription = !!trimmedDescription
    return hasDescription
  }

  getCategory(): string {
    const categoryOrNull = this.categoriesService.getCategoryByDatabaseName(
      this.product.categoryName
    )
    if (categoryOrNull) {
      return categoryOrNull.visualName
    }
    return "Unknown"
  }

  private deleteProduct() {
    return this.productsService.deleteProduct$(this.product.id).subscribe()
  }

  private getCurrentUrl() {
    return window.location.href
  }

  private async loadAll(): Promise<void> {
    const productId = await firstValueFrom(this.parseProductIdFromUrl)
    const product = await firstValueFrom(this.loadProduct(productId))
    const user = await firstValueFrom(this.loadUser(product.userId))

    this.product = product
    this.user = user
  }

  private parseProductIdFromUrl: Observable<string> = this.currentRoute.params.pipe(
    map(params => params["id"])
  )

  private loadUser(id: string): Observable<User> {
    return this.usersService.loadUser({ id })
  }

  private loadProduct(id: string): Observable<Product> {
    return this.productsService
      .loadFullProduct$(id)
      .pipe(map(product => this.addDefaultImageToProduct(product)))
  }

  private addDefaultImageToProduct(product: Product): Product {
    const productHasNoImages = product.imagesUrls.length === 0
    if (productHasNoImages) {
      product.imagesUrls.push("assets/pictures/no-image.webp")
    }
    return product
  }
}
