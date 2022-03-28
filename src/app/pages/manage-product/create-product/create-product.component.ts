import { Component, OnInit } from "@angular/core"
import { UploadProductResponse } from "src/app/features/products/products.interface"
import { ManageProductComponent } from "../manage-product.component"

@Component({
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.scss"]
})
export class CreateProductPageComponent extends ManageProductComponent implements OnInit {
  uploadErrorText = ""
  loading = false

  get isSubmitButtonLocked(): boolean {
    const isFormInvalid = !this.isFromValid
    return isFormInvalid || this.loading
  }

  ngOnInit(): void {
    this.setInputsDefaultValues()
  }

  setInputsDefaultValues() {}

  async uploadProduct() {
    this.loading = true
    const dataToUpload = this.getDataToUpload()

    const response = await this.productsService.uploadProductAsync(dataToUpload)
    if (response.status !== "success") {
      this.displayUploadError(response)
    }
    this.loading = false
  }

  private displayUploadError({ error }: UploadProductResponse) {
    if (error === "unknownError") {
      this.uploadErrorText = "Can't create. Reason: Unknown"
    }
  }
}
