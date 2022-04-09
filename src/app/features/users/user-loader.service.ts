import { Injectable } from "@angular/core"
import { firstValueFrom, Observable, pluck } from "rxjs"
import { UserGQL, UserQueryVariables, UserWithShortProductsGQL } from "src/generated-gql-types"
import { User, UserWithShortProducts } from "./users.interface"

@Injectable({
  providedIn: "root"
})
export class UsersLoaderService {
  constructor(
    private userQuery: UserGQL,
    private userWithShortProductsQuery: UserWithShortProductsGQL
  ) {}

  async loadUser(variables: UserQueryVariables): Promise<User> {
    return firstValueFrom(this.loadUser$(variables))
  }

  loadUser$(variables: UserQueryVariables): Observable<User> {
    const parsedUser$ = this.userQuery.fetch(variables).pipe(pluck("data", "user"))

    return parsedUser$
  }

  async loadUserWithProducts(variables: UserQueryVariables) {
    return firstValueFrom(this.loadUserWithProducts$(variables))
  }

  loadUserWithProducts$(variables: UserQueryVariables): Observable<UserWithShortProducts> {
    const parsedUser$ = this.userWithShortProductsQuery.fetch(variables).pipe(pluck("data", "user"))

    return parsedUser$
  }
}
