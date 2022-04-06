import { Injectable } from "@angular/core"
import { firstValueFrom, from, map, Observable, pluck } from "rxjs"
import {
  CreateSellerGQL,
  CreateSellerMutationVariables,
  UserGQL,
  UserQueryVariables,
  UserWithShortProductsGQL
} from "src/generated-gql-types"
import { User, UserWithShortProducts } from "./users.interface"

export type CreateSellerStatus = "success" | "duplicate" | "unknown"

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private userQuery: UserGQL,
    private userWithShortProductsQuery: UserWithShortProductsGQL,
    private createSellerMutation: CreateSellerGQL
  ) {}

  async loadUserAsync(variables: UserQueryVariables): Promise<User> {
    return firstValueFrom(this.loadUser$(variables))
  }

  loadUser$(variables: UserQueryVariables): Observable<User> {
    const parsedUser$ = this.userQuery.fetch(variables).pipe(pluck("data", "user"))

    return parsedUser$
  }

  loadUserWithProducts(variables: UserQueryVariables): Observable<UserWithShortProducts> {
    const parsedUser$ = this.userWithShortProductsQuery.fetch(variables).pipe(pluck("data", "user"))

    return parsedUser$
  }

  createSeller$(variables: CreateSellerMutationVariables): Observable<CreateSellerStatus> {
    return from(this.createSellerAsync(variables))
  }

  async createSellerAsync(variables: CreateSellerMutationVariables): Promise<CreateSellerStatus> {
    try {
      await firstValueFrom(this.createSellerMutation.mutate(variables))
      return "success"
    } catch (err: any) {
      const error = err.graphQLErrors[0]

      // TODO: add parsing service
      const userAlreadyExists = error.extensions["code"] === "409"
      if (userAlreadyExists) {
        return "duplicate"
      }
      return "unknown"
    }
  }
}
