import { Component } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { AppPathsEnum } from "src/app/app/app-routing.module"
import { CommonDialogsService } from "src/app/common/components/dialogs/dialogs.service"
import { CommonLoginDialogComponent } from "src/app/common/components/dialogs/login/login-dialog.component"
import { AppRouterService } from "src/app/common/services/router.service"
import { ProductAbilities } from "src/app/features/products/product.abilities"

@Component({
  selector: "products-navbar",
  templateUrl: "./products-navbar.component.html",
  styleUrls: ["./products-navbar.component.scss"],
  providers: []
})
export class ProductsNavbarComponent {
  constructor(
    private productAbilities: ProductAbilities,
    private appRouter: AppRouterService,
    private dialogsManager: MatDialog
  ) {}

  onCreateProduct() {
    const canCreate = this.canCreateProduct()
    if (canCreate) {
      this.appRouter.redirectCreateProduct()
    } else {
      this.dialogsManager.open(CommonLoginDialogComponent)
    }
  }

  private canCreateProduct(): boolean {
    return this.productAbilities.canCreateProduct()
  }
}
