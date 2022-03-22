import { User as GeneratedUser } from "src/generated-gql-types"
import { ShortProduct } from "../products/products.interface"

type ShortProductsField = { products: ShortProduct[] }

export type User = Omit<GeneratedUser, "products">
export type UserWithShortProducts = User & ShortProductsField
