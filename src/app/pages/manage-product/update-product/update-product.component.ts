import { Component, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { firstValueFrom, map, Observable } from "rxjs"
import { CommonImageDragAndDrop } from "src/app/common/components/drag-and-drop/image/image-dad.component"
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
  @ViewChild("imagesDragAndDrop")
  imagesDragAndDrop!: CommonImageDragAndDrop

  imagesSnapshot: Blob[] = []

  loaded = false
  product!: Product

  constructor(
    private updateProductService: UpdateProductService,
    private currentRoute: ActivatedRoute,
    protected productsService: ProductsService,
    protected router: Router
  ) {
    super(productsService, router)
  }

  async ngOnInit() {
    const productId = await this.getProductId()
    const product = await this.loadProduct(productId)
    this.product = product

    const imagesSnapshot = await this.updateProductService.makeImagesSnapshot(product.imagesUrls)
    this.imagesSnapshot = imagesSnapshot
  }

  async onUpdate() {
    await this.updateProduct()
  }

  private async updateProduct() {
    await this.updateImages()
    await this.updateFields()
  }

  private async updateFields() {}

  private async updateImages() {
    const newImages = this.getCurrentImages()
    const oldImages = this.imagesSnapshot
    const productId = this.product.id
    this.updateProductService.updateChangedImagesOnly({ oldImages, newImages, productId })
  }

  private async loadProduct(productId: string): Promise<Product> {
    return await this.productsService.loadFullProductAsync(productId)
  }

  async getProductId(): Promise<string> {
    return firstValueFrom(this.currentRoute.params.pipe(map(params => params["id"])))
  }

  getCurrentImages(): Blob[] {
    return this.imagesDragAndDrop.getFiles()
  }
}
