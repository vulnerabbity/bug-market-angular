import { Injectable } from "@angular/core"
import { ProductsImagesService } from "src/app/features/products/products-images.service"
import { ProductsService } from "src/app/features/products/products.service"
import { Product } from "src/generated-gql-types"

export interface UpdateChangedImagesOnlyInput {
  product: Product
  oldImages: Blob[]
  newImages: Blob[]
}

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

    const changedImagesMask = this.getChangedImagesMask(oldImages, newImages)

    for (let imageIndex = 0; imageIndex < changedImagesMask.length; imageIndex++) {
      const imageId = product.imagesIds[imageIndex]

      const newImage = newImages[imageIndex]
      const oldImage = oldImages[imageIndex]
      const hasNewImage = newImage !== undefined
      const hasOldImage = oldImage !== undefined

      const needDeleteImage = !hasNewImage
      const needCreateImage = hasNewImage && !hasOldImage
      const needUpdateImage = hasNewImage && hasOldImage

      if (needDeleteImage) {
        await this.productsImagesService.deleteImageAsync({ imageId, productId })
      } else if (needCreateImage) {
        await this.productsImagesService.sendImageAsync({ image: newImage, productId })
      } else if (needUpdateImage) {
        await this.productsImagesService.updateImageAsync({ image: newImage, imageId, productId })
      } else {
        console.log("nothing need")
      }
    }
  }

  private getChangedImagesMask(oldImages: Blob[], newImages: Blob[]): boolean[] {
    const result = []
    const largestImagesLength = Math.max(oldImages.length, newImages.length)

    for (let imageIndex = 0; imageIndex < largestImagesLength; imageIndex++) {
      const oldImage = oldImages[imageIndex]
      const newImage = newImages[imageIndex]

      result.push(this.isNewImage(oldImage, newImage))
    }

    return result
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
