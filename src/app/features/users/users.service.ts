import { Injectable } from "@angular/core"
import { map, Observable, pluck } from "rxjs"
import { FilesService } from "src/app/common/services/files.service"
import { UserGQL, UserQueryVariables, UserWithShortProductsGQL } from "src/generated-gql-types"
import { ProductsService } from "../products/products.service"
import { User, UserWithShortProducts } from "./users.interface"

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private filesService: FilesService,
    private userQuery: UserGQL,
    private userWithShortProductsQuery: UserWithShortProductsGQL,
    private productsService: ProductsService
  ) {}

  loadUser(variables: UserQueryVariables): Observable<User> {
    const parsedUser$ = this.userQuery.fetch(variables).pipe(pluck("data", "user"))
    const userWithAvatarPath$ = parsedUser$.pipe(map(user => this.addAvatarFullPathToUser(user)))

    return userWithAvatarPath$
  }

  loadUserWithProducts(variables: UserQueryVariables): Observable<UserWithShortProducts> {
    const parsedUser$ = this.userWithShortProductsQuery.fetch(variables).pipe(pluck("data", "user"))
    const userWithAvatarPath$ = parsedUser$.pipe(map(user => this.addAvatarFullPathToUser(user)))
    const userWithAvatarAndProductsPaths$ = userWithAvatarPath$.pipe(
      map(user => this.addProductImagesFullPathToUser(user))
    )
    return userWithAvatarAndProductsPaths$
  }

  private addAvatarFullPathToUser<T extends User>(user: T): T {
    user = { ...user }
    if (!user.avatarUrl) {
      return user
    }
    user.avatarUrl = this.filesService.getPublicFileFullPath(user.avatarUrl)
    return user
  }

  private addProductImagesFullPathToUser(user: UserWithShortProducts): UserWithShortProducts {
    user = { ...user }
    user.products = user.products.map(product => this.productsService.addImagePath(product))
    return user
  }
}
