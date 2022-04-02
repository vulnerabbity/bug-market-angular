import { Injectable } from "@angular/core"

import { catchError, firstValueFrom, from, map, Observable, of, pluck } from "rxjs"
import {
  UpdateManyProductImagesInput,
  UpdateSingleProductImageInput,
  DeleteSingleProductImageInput,
  DeleteProductImageStatus,
  CreateManyProductImagesInput,
  CreateProductImageStatus
} from "./products.interface"
import { environment } from "src/environments/environment"
import { HttpClient } from "@angular/common/http"

export interface ProductImage {
  productId: string
  image: Blob
}

@Injectable({
  providedIn: "root"
})
export class ProductsImagesService {
  constructor(private http: HttpClient) {}

  async sendImages({ images, productId }: CreateManyProductImagesInput) {
    this.failIfTryingToSendMoreImagesThanLimit(images)

    for (const image of images) {
      await this.sendImageAsync({ image, productId })
    }
  }

  sendImageAsync(input: ProductImage) {
    return firstValueFrom(this.sendImage$(input))
  }

  sendImage$(input: ProductImage): Observable<CreateProductImageStatus> {
    const { image, productId } = input
    const endpoint = this.getImagesEndpoint(productId)
    const body = this.makeImageBody(image)

    return this.http.post(endpoint, body).pipe(
      catchError(() => "error"),
      map(() => "success")
    )
  }

  async updateImages({ images, product }: UpdateManyProductImagesInput) {
    this.failIfTryingToSendMoreImagesThanLimit(images)

    for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
      try {
        await this.updateImageAsync({
          image: images[imageIndex],
          imageId: product.imagesIds[imageIndex],
          productId: product.id
        })
      } catch (err) {
        console.log("Image upload error", err)
      }
    }
  }

  updateImage$(input: UpdateSingleProductImageInput) {
    const imageUploadEndpoint = this.getImageEndpoint(input)

    const body = this.makeImageBody(input.image)
    return this.http.put(imageUploadEndpoint, body)
  }

  updateImageAsync(input: UpdateSingleProductImageInput) {
    return firstValueFrom(this.updateImage$(input))
  }

  async deleteImageAsync(input: DeleteSingleProductImageInput): Promise<DeleteProductImageStatus> {
    return await firstValueFrom(this.deleteImage$(input))
  }

  deleteImage$(input: DeleteSingleProductImageInput): Observable<DeleteProductImageStatus> {
    const deleteImageEndpoint = this.getImageEndpoint(input)
    const query = this.http.delete(deleteImageEndpoint)

    const successStatus: DeleteProductImageStatus = "success"
    const errorStatus: DeleteProductImageStatus = "error"

    return query.pipe(
      map(() => successStatus),
      catchError(() => of(errorStatus))
    )
  }

  private getImageEndpoint({ productId, imageId }: { productId: string; imageId: string }): string {
    const imagesEndpoint = this.getImagesEndpoint(productId)
    const concreteImageUploadEndpoint = `${imagesEndpoint}/${imageId}`
    return concreteImageUploadEndpoint
  }

  private getImagesEndpoint(productId: string) {
    return `${environment.backendUrl}/products/images/${productId}`
  }

  /**
   * Api supports up to 10 images
   */
  private failIfTryingToSendMoreImagesThanLimit(images: Blob[]) {
    const apiImagesLimit = 10
    const reachedUploadLimit = images.length > apiImagesLimit
    if (reachedUploadLimit) {
      throw new Error(`Products service cant upload more than ${apiImagesLimit} images`)
    }
  }

  private makeImageBody(image: Blob): FormData {
    // api accepts image with field name "image"
    const formWithImage = new FormData()
    formWithImage.append("image", image)

    return formWithImage
  }
}
