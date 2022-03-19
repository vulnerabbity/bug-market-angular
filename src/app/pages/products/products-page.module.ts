import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/modules/common.module"
import { ProductsModule } from "src/app/features/products/products.module"
import { ProductsPageComponent } from "./products-page.component"

@NgModule({
  imports: [AppCommonModule, ProductsModule],
  declarations: [ProductsPageComponent]
})
export class ProductsPageModule {}
