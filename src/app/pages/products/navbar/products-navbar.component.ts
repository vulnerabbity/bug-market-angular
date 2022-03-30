import { Component } from "@angular/core"
import { AppPathsEnum } from "src/app/app/app-routing.module"
import { ProductAbilities } from "src/app/features/products/product.abilities"
import { UserStatusService } from "src/app/features/users/user-status.service"

@Component({
  selector: "products-navbar",
  templateUrl: "./products-navbar.component.html",
  styleUrls: ["./products-navbar.component.scss"],
  providers: [UserStatusService]
})
export class ProductsNavbarComponent {
  createProductPath = "/" + AppPathsEnum.CreateProduct

  get createProductTooltipText(): string {
    const cantCreateProduct = this.canCreateProduct()
    if (cantCreateProduct) {
      return "Add new product"
    }
    return "Login required"
  }

  constructor(private productAbilities: ProductAbilities) {}

  getCreateProductPathIfAllowed(): string | null {
    const isAllowed = this.canCreateProduct()
    if (isAllowed) {
      return this.createProductPath
    }
    return null
  }

  canCreateProduct(): boolean {
    return this.productAbilities.canCreateProduct()
  }
}
