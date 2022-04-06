import { Injectable } from "@angular/core"
import { CommonImagesService } from "src/app/common/services/images.service"
import { ProductsImagesService } from "src/app/features/products/products-images.service"
import { ProductsService } from "src/app/features/products/products.service"
import { Product } from "src/generated-gql-types"

export interface UpdateChangedImagesOnlyInput {
  product: Product
  oldImages: Blob[]
  newImages: Blob[]
}

type ImageAction = "nothing" | "update" | "delete" | "create"

@Injectable({
  providedIn: "root"
})
export class UpdateProductService {
  constructor(
    private productsImagesService: ProductsImagesService,
    private imagesService: CommonImagesService
  ) {}

  async updateChangedImagesOnly(input: UpdateChangedImagesOnlyInput): Promise<void> {
    const { newImages, oldImages, product } = input
    const { id: productId } = product

    const imagesLength = Math.max(newImages.length, oldImages.length)

    for (let imageIndex = 0; imageIndex < imagesLength; imageIndex++) {
      const imageId = product.imagesIds[imageIndex]
      const newImage = newImages[imageIndex]
      const oldImage = oldImages[imageIndex]

      const actionWithImage = this.getActionWithImages(oldImage, newImage)

      if (actionWithImage === "delete") {
        await this.productsImagesService.deleteImageAsync({ imageId, productId })
      } else if (actionWithImage === "create") {
        await this.productsImagesService.sendImageAsync({ image: newImage, productId })
      } else if (actionWithImage === "update") {
        await this.productsImagesService.updateImageAsync({ image: newImage, imageId, productId })
      }
    }
  }

  private getActionWithImages(oldImage: Blob | undefined, newImage: Blob | undefined): ImageAction {
    const hasNewImage = newImage !== undefined
    const hasOldImage = oldImage !== undefined
    const hasDifferentImages = this.hasDifferentImages(newImage, oldImage)

    const needDeleteImage = !hasNewImage
    const needCreateImage = hasNewImage && !hasOldImage
    const needUpdateImage = hasDifferentImages

    if (needCreateImage) {
      return "create"
    }
    if (needDeleteImage) {
      return "delete"
    }
    if (needUpdateImage) {
      return "update"
    }
    return "nothing"
  }

  private hasDifferentImages(oldImage: Blob | undefined, newImage: Blob | undefined): boolean {
    const hasBothImages = !!oldImage && !!newImage
    return hasBothImages && this.imagesService.isBlobsSameFast(oldImage, newImage) === false
  }
}
