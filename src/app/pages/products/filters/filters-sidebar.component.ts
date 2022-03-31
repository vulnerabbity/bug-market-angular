import { Component, EventEmitter, OnInit, Output } from "@angular/core"
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
export class ProductPageFiltersSidebar implements OnInit {
  priceSorting: SortingOptions = "NO_SORTING"

  category = initProductCategoryAutocompleteModel()

  rangeModel: RangeModel = { min: null, max: null }

  @Output()
  onApply = new EventEmitter<ProductSidebarFilters>()

  ngOnInit(): void {}

  emitApply() {
    const filters = this.getCurrentFilters()
    this.onApply.next(filters)
  }

  private getCurrentFilters(): ProductSidebarFilters {
    const filters: ProductSidebarFilters = {
      category: this.category.selectedCategory,
      priceSorting: this.priceSorting
    }

    const { min: rangeMin, max: rangeMax } = this.rangeModel
    const rangeSelected = rangeMax !== null

    if (rangeSelected) {
      filters.priceRange = { min: rangeMin ?? undefined, max: rangeMax }
    }

    return filters
  }
}
