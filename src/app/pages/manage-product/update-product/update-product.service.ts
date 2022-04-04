import { Injectable } from "@angular/core"
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
  constructor(private productsImagesService: ProductsImagesService) {}

  async makeImagesSnapshot(urls: string[]): Promise<Blob[]> {
    const result: Blob[] = []
    for (const url of urls) {
      const response = await fetch(url)
      const blobFromResponse = await response.blob()
      result.push(blobFromResponse)
    }
    return result
  }

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
    const hasBothImages = hasNewImage && hasOldImage
    const hasDifferentImages = hasBothImages && this.isBlobsSameFast(oldImage, newImage) === false

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

  private isNewImage(
    oldImageCandidate: Blob | undefined,
    newImageCandidate: Blob | undefined
  ): boolean {
    if (newImageCandidate === undefined) {
      return true
    }
    if (oldImageCandidate === undefined) {
      return true
    }

    const isNotSame = !this.isBlobsSameFast(oldImageCandidate, newImageCandidate)
    return isNotSame
  }

  /**
   * Compares two blobs by size
   */
  private isBlobsSameFast(oldBlob: Blob, newBlob: Blob): boolean {
    return oldBlob.size == newBlob.size
  }
}
