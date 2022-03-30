import { ProductCategory } from "./categories.interface"
import { CategoriesList } from "./categories.data"
import { Injectable } from "@angular/core"
import Fuse from "fuse.js"

const fuseConfig: Fuse.IFuseOptions<ProductCategory> = {
  threshold: 0.6,
  keys: ["visualName", "databaseName"]
}

@Injectable({ providedIn: "root" })
export class ProductCategoriesService {
  private readonly localCategories = CategoriesList
  private fuseSearcher: Fuse<ProductCategory> = new Fuse(this.getCategoriesLocal(), fuseConfig)

  /**
   * Gets categories list from client.
   * Warning! May be outdated
   */
  getCategoriesLocal(): ProductCategory[] {
    return this.localCategories
  }

  fuzzySearchLocal(search: string): ProductCategory[] {
    if (search === "") {
      return this.getCategoriesLocal()
    }
    return this.searchWitFuse(search)
  }

  getCategoryByDatabaseName(databaseName: string): ProductCategory | null {
    const categories = this.getCategoriesLocal()
    const foundedCategory = categories.find(category => category.databaseName === databaseName)
    if (foundedCategory === undefined) {
      return null
    }
    return foundedCategory
  }

  private searchWitFuse(search: string): ProductCategory[] {
    const fuseResult = this.fuseSearcher.search(search)
    const paredResult = this.parseFuseResult(fuseResult)
    return paredResult
  }

  private parseFuseResult<T>(fuseResult: Fuse.FuseResult<T>[]): T[] {
    return fuseResult.map(result => result.item)
  }
}
