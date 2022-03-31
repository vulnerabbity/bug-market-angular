import { Component, EventEmitter, OnInit, Output } from "@angular/core"
import { initProductCategoryAutocompleteModel } from "src/app/common/components/autocomplete/category.component"
import { ProductCategory } from "src/app/features/categories/categories.interface"
import { SortingOrder as SortingOrderEnum } from "src/generated-gql-types"

type SortingOrder = `${SortingOrderEnum}`
export type SortingOptions = SortingOrder | "NO_SORTING"

export interface ProductSidebarFilters {
  category: ProductCategory | null
  priceSorting: SortingOptions
}

@Component({
  selector: "product-page-filters-sidebar",
  templateUrl: "./filters-sidebar.component.html",
  styleUrls: ["./filters-sidebar.component.scss"]
})
export class ProductPageFiltersSidebar implements OnInit {
  priceSorting: SortingOptions = "NO_SORTING"

  category = initProductCategoryAutocompleteModel()

  @Output()
  onApply = new EventEmitter<ProductSidebarFilters>()

  ngOnInit(): void {}

  emitApply() {
    const filters = this.getCurrentFilters()
    this.onApply.next(filters)
  }

  getCurrentFilters(): ProductSidebarFilters {
    return {
      category: this.category.selectedCategory,
      priceSorting: this.priceSorting
    }
  }
}
