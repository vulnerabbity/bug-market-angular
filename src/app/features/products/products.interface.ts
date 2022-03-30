import { Maybe, Product as GeneratedProduct } from "src/generated-gql-types"
import { PaginatedFeature } from "../features.interfaces"

export class Product implements GeneratedProduct {
  categoryName!: string
  createdAt!: Date
  description?: Maybe<string> | undefined
  id!: string
  imagesUrls!: string[]
  name!: string
  price!: number
  userId!: string
}

export type ShortProduct = Pick<GeneratedProduct, "id" | "name" | "price" | "imagesUrls">

export type PaginatedShortProducts = PaginatedFeature<ShortProduct>

export interface UploadProductResponse {
  status: "success" | "error"
  productId?: string
  error?: "unknownError"
}

export interface UploadProductImageResponse {
  status: "success" | "error"
}

export type DeleteProductImageStatus = "success" | "error"

export type DeleteProductStatus = "success" | "unknown-error"

export interface UploadManyProductImagesInput {
  images: Blob[]
  productId: string
}

export interface DeleteSingleProductImageInput {
  productId: string
  imageIndex: number
}

export interface UploadSingleProductImageInput extends DeleteSingleProductImageInput {
  image: Blob
}
