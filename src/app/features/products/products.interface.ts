import { Maybe, Product as GeneratedProduct } from "src/generated-gql-types"
import { PaginatedFeature } from "../features.interfaces"

export class Product implements GeneratedProduct {
  categoryName!: string
  createdAt!: Date
  description?: Maybe<string> | undefined
  id!: string
  imagesUrls!: string[]
  imagesIds!: string[]
  name!: string
  price!: number
  userId!: string
}

export type ShortProduct = Pick<GeneratedProduct, "id" | "name" | "price" | "imagesUrls">

export type PaginatedShortProducts = PaginatedFeature<ShortProduct>

export interface CreateManyProductImagesInput {
  images: Blob[]
  productId: string
}

// convert to union
export type CreateProductImageStatus = "success" | "error"

export interface UploadProductResponse {
  status: "success" | "error"
  productId?: string
  error?: "unknownError"
}

export enum UpdateProductStatusesEnum {
  Success = "success",
  Error = "error"
}
// convert to union
export type UpdateProductStatus = `${UpdateProductStatusesEnum}`
export interface UpdateProductImageResponse {
  status: "success" | "error"
}

export interface UpdateManyProductImagesInput {
  images: Blob[]
  product: Product
}

export interface UpdateSingleProductImageInput extends DeleteSingleProductImageInput {
  image: Blob
}

export type DeleteProductImageStatus = "success" | "error"
export type DeleteProductStatus = "success" | "unknown-error"

export interface DeleteSingleProductImageInput {
  productId: string
  imageId: string
}
