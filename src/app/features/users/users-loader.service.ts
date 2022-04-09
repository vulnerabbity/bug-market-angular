import { Injectable } from "@angular/core"
import { firstValueFrom, map, Observable, pluck, tap } from "rxjs"
import {
  UserGQL,
  UserQueryVariables,
  UserWithShortProductsGQL,
  UserWithShortProductsQueryVariables
} from "src/generated-gql-types"
import { User, UserWithShortProducts } from "./users.interface"
import { HttpResponse } from "src/app/common/interfaces/responses.interface"
import { GraphqlParserService } from "src/app/common/services/graphql-parser.service"
import { ErrorsRouterService } from "src/app/pages/errors/error-router.service"

export type UserResponse = HttpResponse<User>
export type UserWithShortProductsResponse = HttpResponse<UserWithShortProducts>

@Injectable({
  providedIn: "root"
})
export class UsersLoaderService {
  constructor(
    private gqlParser: GraphqlParserService,
    private userQuery: UserGQL,
    private errorsRouter: ErrorsRouterService,
    private userWithShortProductsQuery: UserWithShortProductsGQL
  ) {}

  loadUserOrRedirect(variables: UserQueryVariables) {
    return firstValueFrom(this.loadUserOrRedirect$(variables))
  }

  loadUserOrRedirect$(variables: UserQueryVariables): Observable<User> {
    const usersResponse$ = this.loadUserResponse$(variables)

    const user$ = usersResponse$.pipe(
      tap(request => this.errorsRouter.redirectIfError(request)),
      pluck("data")
    ) as Observable<User>
    return user$
  }

  async loadUserResponse(variables: UserQueryVariables) {
    return firstValueFrom(this.loadUserResponse$(variables))
  }

  loadUserResponse$(variables: UserQueryVariables): Observable<UserResponse> {
    const response$ = this.userQuery.fetch(variables)
    const parsedResponse = response$.pipe(map(response => this.gqlParser.parse<User>(response)))

    return parsedResponse
  }

  loadUserWithProductsOrRedirect(variables: UserWithShortProductsQueryVariables) {
    return firstValueFrom(this.loadUserWithProductsOrRedirect$(variables))
  }

  loadUserWithProductsOrRedirect$(
    variables: UserWithShortProductsQueryVariables
  ): Observable<UserWithShortProducts> {
    const userWithProductsResponse$ = this.loadUserWithProductsResponse$(variables)

    const userWithProducts$ = userWithProductsResponse$.pipe(
      tap(response => this.errorsRouter.redirectIfError(response)),
      pluck("data")
    ) as Observable<UserWithShortProducts>

    return userWithProducts$
  }

  async loadUserWithProductsResponse(variables: UserWithShortProductsQueryVariables) {
    return firstValueFrom(this.loadUserWithProductsResponse$(variables))
  }

  loadUserWithProductsResponse$(
    variables: UserWithShortProductsQueryVariables
  ): Observable<UserWithShortProductsResponse> {
    const response$ = this.userWithShortProductsQuery.fetch(variables)
    const parsedResponse$ = response$.pipe(
      map(response => this.gqlParser.parse<UserWithShortProducts>(response))
    )

    return parsedResponse$
  }
}
