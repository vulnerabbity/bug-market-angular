import { Component } from "@angular/core"
import { AppPathsEnum } from "src/app/app/app-routing.module"
import { ProductAbilities } from "src/app/features/products/product.abilities"

@Component({
  selector: "common-create-product-link",
  template: `
    <common-link
      [link]="link"
      [disabled]="canCreateProduct() === false"
      text="Add new product"
      matIconName="add_box"
      iconPosition="before"
      iconSize="small"
      [tooltip]="createProductTooltipText"
    ></common-link>
  `
})
export class CommonCreateProductLinkComponent {
  link = `/${AppPathsEnum.CreateProduct}`

  constructor(private productAbilities: ProductAbilities) {}

  canCreateProduct(): boolean {
    return this.productAbilities.canCreateProduct()
  }

  get createProductTooltipText(): string {
    const cantCreateProduct = this.canCreateProduct()
    if (cantCreateProduct) {
      return "Add new product"
    }
    return "Login required"
  }
}
