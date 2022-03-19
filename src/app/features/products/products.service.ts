import { Injectable } from "@angular/core"
import { ShortProductsGQL, ShortProductsQueryVariables } from "src/generated-gql-types"
import { Observable, pluck, take } from "rxjs"
import { PaginatedShortProduct } from "./products.interface"

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(private shortProductsQuery: ShortProductsGQL) {}
  loadShortProducts(options?: ShortProductsQueryVariables): Observable<PaginatedShortProduct> {
    const response = this.shortProductsQuery.fetch(options)
    const parsedResponse = response.pipe(pluck("data", "products"), take(1))
    return parsedResponse
  }
}
