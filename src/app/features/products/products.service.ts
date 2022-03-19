import { Injectable } from "@angular/core"
import { ShortProductsGQL, ShortProductsQueryVariables } from "src/generated-gql-types"
import { Observable, pluck } from "rxjs"
import { PaginatedShortProduct } from "./products.interface"

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  constructor(private shortProductsQuery: ShortProductsGQL) {}
  loadShortProducts(options?: ShortProductsQueryVariables): Observable<PaginatedShortProduct> {
    return this.shortProductsQuery.fetch(options).pipe(pluck("data", "products"))
  }
}
