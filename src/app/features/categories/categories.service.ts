import { ProductCategory } from "./categories.interface"
import { CategoriesList } from "./categories.data"

export class ProductCategoriesService {
  localCategories = CategoriesList

  /**
   * Gets categories list from client.
   * Warning! May be outdated
   */
  getCategoriesLocal(): ProductCategory[] {
    return this.localCategories
  }
}
