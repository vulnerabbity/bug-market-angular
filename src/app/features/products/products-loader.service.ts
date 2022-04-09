import { Injectable } from "@angular/core"
import {
  FullProductGQL,
  ShortProductsGQL,
  ShortProductsQueryVariables
} from "src/generated-gql-types"
import { map, Observable, pluck, tap } from "rxjs"
import { PaginatedShortProducts, Product } from "./products.interface"
import { ErrorsRouterService } from "src/app/pages/errors/error-router.service"
import { HttpResponse } from "src/app/common/interfaces/responses.interface"
import { GraphqlParserService } from "src/app/common/services/graphql-parser.service"

export type FullProductResponse = HttpResponse<Product>
export type ShortProductsResponse = HttpResponse<PaginatedShortProducts>

@Injectable({
  providedIn: "root"
})
export class ProductsLoaderService {
  constructor(
    private shortProductsQuery: ShortProductsGQL,
    private fullProductQuery: FullProductGQL,
    private errorRouter: ErrorsRouterService,
    private gqpParser: GraphqlParserService
  ) {}

  loadShortProductsOrRedirect$(options?: ShortProductsQueryVariables) {
    const shortProductsResponse$ = this.loadShortProductsResponse$(options)
    const shortProducts$ = shortProductsResponse$.pipe(
      tap(response => this.errorRouter.redirectIfError(response)),
      pluck("data")
    ) as Observable<PaginatedShortProducts>

    return shortProducts$
  }

  loadShortProductsResponse$(
    options?: ShortProductsQueryVariables
  ): Observable<ShortProductsResponse> {
    const response = this.shortProductsQuery.fetch(options)
    const productsResponse$ = response.pipe(
      map(response => this.gqpParser.parse<PaginatedShortProducts>(response))
    )

    return productsResponse$
  }

  /**Redirects on error page if cant load */
  loadFullProductOrRedirect$(id: string): Observable<Product> {
    const product$ = this.loadFullProductResponse$(id).pipe(
      tap(response => this.errorRouter.redirectIfError(response)),
      pluck("data")
    ) as Observable<Product>

    return product$
  }

  loadFullProductResponse$(id: string): Observable<FullProductResponse> {
    const response = this.fullProductQuery.fetch({ id })
    let parsedResponse = response.pipe(map(response => this.gqpParser.parse<Product>(response)))

    return parsedResponse
  }
}
