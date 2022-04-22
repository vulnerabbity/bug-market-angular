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
  UpdateProductStatusesEnum,
  Product
} from "./products.interface"
import { GraphqlParserService } from "src/app/common/services/graphql-parser.service"

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(
    private createProductMutation: CreateProductGQL,
    private deleteProductMutation: DeleteProductGQL,
    private updateProductMutation: UpdateProductGQL,
    private gqlParser: GraphqlParserService
  ) {}

  async uploadProductResponse(input: CreateProductInput) {
    return await firstValueFrom(this.uploadProductResponse$(input))
  }

  uploadProductResponse$(input: CreateProductInput) {
    const response$ = this.createProductMutation.mutate({ input })
    const parsedResponse$ = response$.pipe(map(res => this.gqlParser.parse<Product>(res)))

    return parsedResponse$
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
