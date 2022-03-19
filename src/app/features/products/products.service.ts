import { Injectable } from "@angular/core"
import {
  FullProductGQL,
  Product,
  ShortProductsGQL,
  ShortProductsQueryVariables
} from "src/generated-gql-types"
import { Observable, pluck, take } from "rxjs"
import { PaginatedShortProduct } from "./products.interface"

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(
    private shortProductsQuery: ShortProductsGQL,
    private fullProductQuery: FullProductGQL
  ) {}
  loadShortProducts(options?: ShortProductsQueryVariables): Observable<PaginatedShortProduct> {
    const response = this.shortProductsQuery.fetch(options)
    const parsedResponse = response.pipe(pluck("data", "products"))
    return parsedResponse
  }

  loadFullProduct(id: string): Observable<Product> {
    const response = this.fullProductQuery.fetch({ id })
    const parsedResponse = response.pipe(pluck("data", "product"))
    return parsedResponse
  }
}
