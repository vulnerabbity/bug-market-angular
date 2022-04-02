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

  get isSubmitButtonLocked(): boolean {
    const isFormInvalid = !this.isFromValid
    return isFormInvalid || this.loading
  }

  ngOnInit(): void {}

  onUploadProduct() {
    this.uploadProduct()
  }

  private async uploadProduct(): Promise<void> {
    this.loading = true
    const dataToUpload = this.getDataToUpload()

    const response = await this.productsService.uploadProductAsync(dataToUpload)

    if (response.status !== "success") {
      this.displayUploadError(response)
      return
    }

    const productId = response.productId!
    await this.sendImages(productId)

    this.router.navigate(["/product", productId])

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

  private displayUploadError({ error }: UploadProductResponse) {
    if (error === "unknownError") {
      this.uploadErrorText = "Can't create. Reason: Unknown"
    }
  }
}
