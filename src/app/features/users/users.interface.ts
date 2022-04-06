import { CountryCodes, Maybe, User as GeneratedUser, UserRolesEnum } from "src/generated-gql-types"
import { ShortProduct } from "../products/products.interface"

type ShortProductsField = { products: ShortProduct[] }

export type IUser = Omit<GeneratedUser, "products">
export class User implements IUser {
  id!: string
  name?: Maybe<string> | undefined
  __typename?: "User" | undefined
  about?: Maybe<string> | undefined
  avatarUrl?: Maybe<string> | undefined
  cityId?: Maybe<number> | undefined
  countryCode?: Maybe<CountryCodes> | undefined
  roles!: UserRolesEnum[]
}

export type UserWithShortProducts = IUser & ShortProductsField
