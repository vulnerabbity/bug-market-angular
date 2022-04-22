import { Component, OnInit, ViewChild } from "@angular/core"
import { UploadProductResponse } from "src/app/features/products/products.interface"
import { ManageProductComponent } from "../manage-product.component"
import { CommonImageDragAndDrop } from "src/app/common/components/drag-and-drop/image/image-dad.component"

@Component({
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"]
})
export class CreateProductPageComponent extends ManageProductComponent implements OnInit {
  @ViewChild("imagesDragAndDrop")
  imagesDragAndDrop!: CommonImageDragAndDrop

  uploadErrorText = ""
  loading = false

  ngOnInit(): void {}

  onUploadProduct() {
    this.uploadProduct()
  }

  isSubmitButtonLocked(): boolean {
    const isFormInvalid = !this.isFromValid
    return isFormInvalid || this.loading
  }

  private async uploadProduct(): Promise<void> {
    this.loading = true
    const dataToUpload = this.getDataToUpload()

    const { data: uploadedProduct } = await this.productsService.uploadProductResponse(dataToUpload)

    if (!uploadedProduct) {
      return
    }

    const { id: productId } = uploadedProduct
    await this.sendImages(productId)

    await this.router.navigate(["/product", productId])

    this.loading = false
  }

  private async sendImages(productId: string) {
    const images = this.getImages()
    await this.productsImagesService.sendImages({
      images,
      productId
    })
  }

  private getImages(): Blob[] {
    return this.imagesDragAndDrop.getFiles()
  }
}
