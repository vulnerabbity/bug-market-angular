import { Component, EventEmitter, Output, ViewChild } from "@angular/core"
import { MatDrawer } from "@angular/material/sidenav"
import { initProductCategoryAutocompleteModel } from "src/app/common/components/autocomplete/category.component"
import { RangeModel } from "src/app/common/components/range/range.component"
import { ProductCategory } from "src/app/features/categories/categories.interface"
import { SortingOrder as SortingOrderEnum, ProductFilters } from "src/generated-gql-types"

type SortingOrder = `${SortingOrderEnum}`
export type SortingOptions = SortingOrder | "NO_SORTING"

export interface ProductSidebarFilters {
  category: ProductCategory | null
  priceSorting: SortingOptions
  priceRange?: ProductFilters["priceRange"]
}

@Component({
  selector: "product-page-filters-sidebar",
  templateUrl: "./filters-sidebar.component.html",
  styleUrls: ["./filters-sidebar.component.scss"]
})
export class ProductPageFiltersSidebar {
  @ViewChild("drawer")
  drawer!: MatDrawer

  priceSorting: SortingOptions = "NO_SORTING"

  category = initProductCategoryAutocompleteModel()

  rangeModel: RangeModel = { min: null, max: null }

  @Output()
  onApply = new EventEmitter<ProductSidebarFilters>()

  submit() {
    this.emitApply()
    this.drawer.close()
  }

  emitApply() {
    const filters = this.getCurrentFilters()
    this.onApply.next(filters)
  }

  toggleSidebar() {
    this.drawer.toggle()
  }

  private getCurrentFilters(): ProductSidebarFilters {
    const filters: ProductSidebarFilters = {
      category: this.category.selectedCategory,
      priceSorting: this.priceSorting
    }

    const { min: rangeMin, max: rangeMax } = this.rangeModel

    filters.priceRange = { min: rangeMin ?? 0, max: rangeMax ?? 999_999_999 }

    return filters
  }
}
