import { Component, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { firstValueFrom, map } from "rxjs"
import { CommonImageDragAndDrop } from "src/app/common/components/drag-and-drop/image/image-dad.component"
import { ProductCategoriesService } from "src/app/features/categories/categories.service"
import { Product } from "src/app/features/products/products.interface"
import { ProductsService } from "src/app/features/products/products.service"
import { ManageProductComponent } from "../manage-product.component"
import { UpdateProductService } from "./update-product.service"

@Component({
  selector: "update-product-page",
  templateUrl: "./update-product.component.html",
  styleUrls: ["./update-product.component.scss"]
})
export class UpdateProductPageComponent extends ManageProductComponent implements OnInit {
  loaded = false

  @ViewChild("imagesDragAndDrop")
  imagesDragAndDrop!: CommonImageDragAndDrop

  imagesSnapshot: Blob[] = []

  product!: Product

  constructor(
    private updateProductService: UpdateProductService,
    private currentRoute: ActivatedRoute,
    private categoriesService: ProductCategoriesService,
    protected productsService: ProductsService,
    protected router: Router
  ) {
    super(productsService, router)
  }

  async ngOnInit() {
    this.loaded = false
    const productId = await this.getProductId()
    const product = await this.loadProduct(productId)
    this.product = product

    this.initFormValues()

    this.imagesSnapshot = await this.updateProductService.makeImagesSnapshot(product.imagesUrls)
    this.loaded = true
  }

  isUpdateLocked(): boolean {
    return this.isFromValid === false
  }

  getLoaderSpinnerDiameter(): number {
    const halfOfWindowWidth = window.innerWidth / 2
    return Math.min(600, halfOfWindowWidth)
  }

  private initFormValues(): void {
    const loadedCategory = this.categoriesService.getCategoryByDatabaseName(
      this.product.categoryName
    )

    this.productNameField = { isValid: true, value: this.product.name }
    this.productDescriptionField = { isValid: true, value: this.product.description ?? "" }
    this.productPriceField = { isValid: true, value: String(this.product.price) }
    this.productCategoryField = { isValid: true, selectedCategory: loadedCategory }
  }

  async onUpdate() {
    this.loaded = false
    await this.updateProduct()
    this.loaded = true
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
    const productId = this.product.id
    this.updateProductService.updateChangedImagesOnly({ oldImages, newImages, productId })
  }

  private async loadProduct(productId: string): Promise<Product> {
    return await this.productsService.loadFullProductAsync(productId)
  }

  private async getProductId(): Promise<string> {
    return firstValueFrom(this.currentRoute.params.pipe(map(params => params["id"])))
  }

  private getCurrentImages(): Blob[] {
    return this.imagesDragAndDrop.getFiles()
  }
}
