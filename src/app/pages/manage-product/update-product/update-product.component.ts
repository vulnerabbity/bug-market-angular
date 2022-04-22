import { Component, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { firstValueFrom, map } from "rxjs"
import { CommonImageDragAndDrop } from "src/app/common/components/drag-and-drop/image/image-dad.component"
import { CommonImagesService } from "src/app/common/services/images.service"
import { AppRouterService } from "src/app/common/services/router.service"
import { ProductCategory } from "src/app/features/categories/categories.interface"
import { ProductCategoriesService } from "src/app/features/categories/categories.service"
import { ProductsImagesService } from "src/app/features/products/products-images.service"
import { ProductsLoaderService } from "src/app/features/products/products-loader.service"
import { Product } from "src/app/features/products/products.interface"
import { ProductsService } from "src/app/features/products/products.service"
import { ManageProductComponent } from "../manage-product.component"
import { UpdateProductDialogsService } from "./update-product-dialogs.service"
import { UpdateProductService } from "./update-product.service"

@Component({
  selector: "update-product-page",
  templateUrl: "./update-product.component.html",
  styleUrls: ["./update-product.component.scss"]
})
export class UpdateProductPageComponent extends ManageProductComponent implements OnInit {
  @ViewChild("imagesDragAndDrop")
  imagesDragAndDrop!: CommonImageDragAndDrop

  imagesSnapshot: Blob[] = []

  loading = false

  product!: Product

  loadedCategory!: ProductCategory

  constructor(
    private updateProductService: UpdateProductService,
    private currentRoute: ActivatedRoute,
    private categoriesService: ProductCategoriesService,
    protected productsService: ProductsService,
    protected productsLoader: ProductsLoaderService,
    protected productImagesService: ProductsImagesService,
    protected imagesService: CommonImagesService,
    protected updateDialogs: UpdateProductDialogsService,
    protected appRouter: AppRouterService,
    protected router: Router
  ) {
    super(productsService, productImagesService, router)
  }

  async ngOnInit() {
    const productId = await this.getProductId()
    const product = await this.loadProduct(productId)
    this.product = product

    this.initFormValues()

    this.imagesSnapshot = await this.imagesService.makeImagesSnapshot(product.imagesUrls)
  }

  async onDiscard() {
    const needDiscard = await this.updateDialogs.showDiscardUpdateConfirm()
    if (needDiscard) {
      this.appRouter.redirectToConcreteProduct(this.product.id)
    }
  }

  isUpdateLocked(): boolean {
    return this.isFromValid === false || this.loading
  }

  getLoaderSpinnerDiameter(): number {
    const halfOfWindowWidth = window.innerWidth / 2
    return Math.min(600, halfOfWindowWidth)
  }

  private initFormValues(): void {
    this.loadedCategory = this.categoriesService.getCategoryByDatabaseName(
      this.product.categoryName
    )!

    this.productNameField = { isValid: true, value: this.product.name }
    this.productDescriptionField = { isValid: true, value: this.product.description ?? "" }
    this.productPriceField = { isValid: true, value: String(this.product.price) }
    this.productCategoryField = { isValid: true, selectedCategory: this.loadedCategory }
  }

  async onUpdate() {
    this.loading = true
    await this.updateProduct()
    await this.redirectToProduct()
  }

  private async redirectToProduct() {
    await this.router.navigate(["/product", this.product.id])
  }

  private async updateProduct() {
    await this.updateImages()
    await this.updateFields()
  }

  private async updateFields() {
    await this.productsService.updateProductAsync({
      id: this.product.id,
      update: this.getDataToUpload()
    })
  }

  private async updateImages() {
    const newImages = this.getCurrentImages()
    const oldImages = this.imagesSnapshot
    const product = this.product
    await this.updateProductService.updateChangedImagesOnly({ oldImages, newImages, product })
  }

  private async loadProduct(productId: string): Promise<Product> {
    return await firstValueFrom(this.productsLoader.loadFullProductOrRedirect$(productId))
  }

  private async getProductId(): Promise<string> {
    return firstValueFrom(this.currentRoute.params.pipe(map(params => params["id"])))
  }

  private getCurrentImages(): Blob[] {
    return this.imagesDragAndDrop.getFiles()
  }
}
