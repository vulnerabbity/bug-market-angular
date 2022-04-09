import { Injectable } from "@angular/core"
import {
  CreateProductGQL,
  CreateProductInput,
  DeleteProductGQL,
  UpdateProductGQL,
  UpdateProductMutationVariables
} from "src/generated-gql-types"
import { catchError, firstValueFrom, map, Observable, of, pluck } from "rxjs"
import {
  UploadProductResponse,
  DeleteProductStatus,
  UpdateProductStatus,
  UpdateProductStatusesEnum
} from "./products.interface"

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(
    private createProductMutation: CreateProductGQL,
    private deleteProductMutation: DeleteProductGQL,
    private updateProductMutation: UpdateProductGQL
  ) {}

  async uploadProductAsync(input: CreateProductInput): Promise<UploadProductResponse> {
    return await firstValueFrom(this.uploadProduct$(input))
  }

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
}
