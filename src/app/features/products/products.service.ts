import { Injectable } from "@angular/core"
import {
  CreateProductGQL,
  CreateProductInput,
  FullProductGQL,
  Product,
  ShortProductsGQL,
  ShortProductsQueryVariables
} from "src/generated-gql-types"
import { firstValueFrom, map, Observable, pluck } from "rxjs"
import {
  UploadProductResponse,
  PaginatedShortProducts,
  UploadManyProductImagesInput,
  UploadSingleProductImageInput
} from "./products.interface"
import { FilesService } from "src/app/common/services/files.service"
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment"

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(
    private http: HttpClient,
    private shortProductsQuery: ShortProductsGQL,
    private fullProductQuery: FullProductGQL,
    private createProductMutation: CreateProductGQL,
    private filesService: FilesService
  ) {}

  loadShortProducts(options?: ShortProductsQueryVariables): Observable<PaginatedShortProducts> {
    const response = this.shortProductsQuery.fetch(options)
    const parsedResponse = response.pipe(pluck("data", "products"))
    const responseWithPaths = parsedResponse.pipe(
      map(paginatedProducts => {
        paginatedProducts = { ...paginatedProducts }
        paginatedProducts.data = paginatedProducts.data.map(product => this.addImagePath(product))
        return paginatedProducts
      })
    )

    return responseWithPaths
  }

  loadFullProduct(id: string): Observable<Product> {
    const response = this.fullProductQuery.fetch({ id })
    let parsedResponse = response.pipe(
      pluck("data", "product"),
      map(product => this.addImagePath(product))
    )

    return parsedResponse
  }

  /**
   * Requires authorization
   */
  uploadProduct$(input: CreateProductInput): Observable<UploadProductResponse> {
    const response = this.createProductMutation.mutate({ input })
    return response.pipe(
      map(response => {
        if (response.data) {
          return { status: "success", productId: response.data.createProduct.id }
        }
        return { status: "error", error: "unknownError" }
      })
    )
  }

  uploadProductAsync(input: CreateProductInput): Promise<UploadProductResponse> {
    return firstValueFrom(this.uploadProduct$(input))
  }

  /**
   * Api supports up to 10 images
   */
  async uploadImages({ images, productId }: UploadManyProductImagesInput) {
    const apiImagesLimit = 10
    const reachedUploadLimit = images.length > apiImagesLimit
    if (reachedUploadLimit) {
      throw new Error(`Products service cant upload more than ${apiImagesLimit} images`)
    }

    for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
      try {
        await this.uploadImageAsync({ image: images[imageIndex], imageIndex, productId })
      } catch (err) {
        console.log("Image upload error", err)
      }
    }
  }

  uploadImage$({ productId, imageIndex, image }: UploadSingleProductImageInput) {
    const productImagesUrl = `${environment.backendUrl}/products/images/${productId}`
    const concreteImageUploadEndpoint = `${productImagesUrl}/${imageIndex}`

    // api accepts image with field name "image"
    const formWithImage = new FormData()
    formWithImage.append("image", image)

    return this.http.post(concreteImageUploadEndpoint, formWithImage).pipe(map((resp: any) => resp))
  }

  uploadImageAsync(input: UploadSingleProductImageInput) {
    return firstValueFrom(this.uploadImage$(input))
  }

  addImagePath<T extends { imagesUrls: string[] }>(product: T) {
    product = { ...product }
    product.imagesUrls = this.filesService.addPathToPublicFiles(product.imagesUrls)
    return product
  }
}
