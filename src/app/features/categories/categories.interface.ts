export const ProductCategoryDatabaseNames = <const>["electronics", "cars", "other"]

// Convert to union type
export type ProductCategoryDatabaseName = typeof ProductCategoryDatabaseNames[number]

export interface ProductCategory {
  visualName: string
  databaseName: ProductCategoryDatabaseName
}
