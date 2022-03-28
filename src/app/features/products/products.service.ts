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
import { UploadProductResponse, PaginatedShortProducts } from "./products.interface"
import { FilesService } from "src/app/common/services/files.service"

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(
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
          return { status: "success", data: response.data.createProduct.id }
        }
        return { status: "error", error: "unknownError" }
      })
    )
  }

  uploadProductAsync(input: CreateProductInput): Promise<UploadProductResponse> {
    return firstValueFrom(this.uploadProduct$(input))
  }

  addImagePath<T extends { imagesUrls: string[] }>(product: T) {
    product = { ...product }
    product.imagesUrls = this.filesService.addPathToPublicFiles(product.imagesUrls)
    return product
  }
}
