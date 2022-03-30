import { Injectable } from "@angular/core"
import { ProductsService } from "src/app/features/products/products.service"

export interface UpdateChangedImagesOnlyInput {
  productId: string
  oldImages: Blob[]
  newImages: Blob[]
}

@Injectable({
  providedIn: "root"
})
export class UpdateProductService {
  constructor(private productsService: ProductsService) {}

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
    const { newImages, oldImages, productId } = input

    const changedImagesMask = this.getChangedImagesMask(oldImages, newImages)

    for (let imageIndex = 0; imageIndex < changedImagesMask.length; imageIndex++) {
      const newImage = newImages[imageIndex]
      const isImageChanged = changedImagesMask[imageIndex]
      const needDeleteImage = newImage === undefined

      if (isImageChanged === false) {
        continue
      }

      if (needDeleteImage) {
        await this.productsService.deleteImageAsync({ imageIndex, productId })
        continue
      }

      await this.productsService.uploadImageAsync({ image: newImage, imageIndex, productId })
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
