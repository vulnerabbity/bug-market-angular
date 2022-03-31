import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/modules/common.module"
import { ProductsModule } from "src/app/features/products/products.module"
import { ProductPageFiltersSidebar } from "./filters/filters-sidebar.component"
import { ProductsNavbarComponent } from "./navbar/products-navbar.component"
import { ProductsPageComponent } from "./products-page.component"

@NgModule({
  imports: [AppCommonModule, ProductsModule],
  declarations: [ProductsPageComponent, ProductsNavbarComponent, ProductPageFiltersSidebar]
})
export class ProductsPageModule {}
