import { Component, Input } from "@angular/core"
import { ProductCategoriesService } from "src/app/features/categories/categories.service"
import { Product } from "src/app/features/products/products.interface"

@Component({
  selector: "concrete-product-data-fields[product]",
  templateUrl: "./data-fields.component.html",
  styleUrls: ["./data-fields.component.scss"]
})
export class ConcreteProductPageDataFieldsComponent {
  @Input()
  product!: Product

  constructor(private categoriesService: ProductCategoriesService) {}

  hasDescription() {
    const trimmedDescription = this.product.description?.trim()
    const hasDescription = !!trimmedDescription
    return hasDescription
  }

  getCategory(): string {
    const categoryOrNull = this.categoriesService.getCategoryByDatabaseName(
      this.product.categoryName
    )
    if (categoryOrNull) {
      return categoryOrNull.visualName
    }
    return "Unknown"
  }
}
