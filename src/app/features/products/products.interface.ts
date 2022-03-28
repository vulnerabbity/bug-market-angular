import { Product } from "src/generated-gql-types"
import { PaginatedFeature } from "../features.interfaces"

export type ShortProduct = Pick<Product, "id" | "name" | "price" | "imagesUrls">
export type PaginatedShortProducts = PaginatedFeature<ShortProduct>

export type UploadProductResponse = {
  status: "success" | "error"
  data?: string
  error?: "unknownError"
}
