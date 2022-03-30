import { Product } from "src/generated-gql-types"
import { PaginatedFeature } from "../features.interfaces"

export type ShortProduct = Pick<Product, "id" | "name" | "price" | "imagesUrls">
export type PaginatedShortProducts = PaginatedFeature<ShortProduct>

export interface UploadProductResponse {
  status: "success" | "error"
  productId?: string
  error?: "unknownError"
}

export interface UploadProductImageResponse {
  status: "success" | "error"
}

export interface UploadManyProductImagesInput {
  images: Blob[]
  productId: string
}

export interface UploadSingleProductImageInput {
  productId: string
  imageIndex: number
  image: Blob
}
