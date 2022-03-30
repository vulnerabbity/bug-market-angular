import { Injectable } from "@angular/core"
import {
  CreateProductGQL,
  CreateProductInput,
  DeleteProductGQL,
  FullProductGQL,
  ShortProductsGQL,
  ShortProductsQueryVariables,
  UpdateProductGQL,
  UpdateProductMutationVariables
} from "src/generated-gql-types"
import { catchError, firstValueFrom, map, Observable, of, pluck } from "rxjs"
import {
  UploadProductResponse,
  PaginatedShortProducts,
  UploadManyProductImagesInput,
  UploadSingleProductImageInput,
  DeleteProductStatus,
  Product,
  DeleteSingleProductImageInput,
  DeleteProductImageStatus,
  UpdateProductStatus,
  UpdateProductStatusesEnum
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
    private deleteProductMutation: DeleteProductGQL,
    private updateProductMutation: UpdateProductGQL,
    private filesService: FilesService
  ) {}

  loadShortProducts$(options?: ShortProductsQueryVariables): Observable<PaginatedShortProducts> {
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

  loadFullProduct$(id: string): Observable<Product> {
    const response = this.fullProductQuery.fetch({ id })
    let parsedResponse = response.pipe(
      pluck("data", "product"),
      map(product => this.addImagePath(product))
    )

    return parsedResponse
  }

  async loadFullProductAsync(id: string): Promise<Product> {
    return await firstValueFrom(this.loadFullProduct$(id))
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
      console.log(imageIndex)
      try {
        await this.uploadImageAsync({ image: images[imageIndex], imageIndex, productId })
      } catch (err) {
        console.log("Image upload error", err)
      }
    }
  }

  uploadImage$(input: UploadSingleProductImageInput) {
    const imageUploadEndpoint = this.getImageEndpoint(input)

    // api accepts image with field name "image"
    const formWithImage = new FormData()
    formWithImage.append("image", input.image)

    return this.http.post(imageUploadEndpoint, formWithImage).pipe(map((resp: any) => resp))
  }

  uploadImageAsync(input: UploadSingleProductImageInput) {
    return firstValueFrom(this.uploadImage$(input))
  }

  deleteProduct$(id: string): Observable<DeleteProductStatus> {
    const query$ = this.deleteProductMutation.mutate({ id })
    return query$.pipe(
      map(response => {
        if (response.data) {
          return "success"
        }
        return "unknown-error"
      })
    )
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

  updateProduct$(variables: UpdateProductMutationVariables): Observable<UpdateProductStatus> {
    const query = this.updateProductMutation.mutate(variables)
    return query.pipe(
      map(() => UpdateProductStatusesEnum.Success),
      catchError(() => of(UpdateProductStatusesEnum.Error))
    )
  }

  async updateProductAsync(
    variables: UpdateProductMutationVariables
  ): Promise<UpdateProductStatus> {
    return firstValueFrom(this.updateProduct$(variables))
  }

  async deleteImageAsync(input: DeleteSingleProductImageInput): Promise<DeleteProductImageStatus> {
    return await firstValueFrom(this.deleteImage$(input))
  }

  addImagePath<T extends { imagesUrls: string[] }>(product: T) {
    product = { ...product }
    product.imagesUrls = this.filesService.addPathToPublicFiles(product.imagesUrls)
    return product
  }

  private getImageEndpoint({
    imageIndex,
    productId
  }: {
    imageIndex: number
    productId: string
  }): string {
    const productImagesUrl = `${environment.backendUrl}/products/images/${productId}`
    const concreteImageUploadEndpoint = `${productImagesUrl}/${imageIndex}`
    return concreteImageUploadEndpoint
  }
}
