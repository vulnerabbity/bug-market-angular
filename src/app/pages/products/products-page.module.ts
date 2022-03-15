import { NgModule } from "@angular/core"
import { AppCommonComponentsModule } from "src/app/common/modules/components.module"
import { ProductsPageComponent } from "./products-page.component"

@NgModule({
  imports: [AppCommonComponentsModule],
  declarations: [ProductsPageComponent]
})
export class ProductsPageModule {}
