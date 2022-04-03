import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/common.module"
import { ProductsService } from "src/app/features/products/products.service"
import { UpdateProductPageComponent } from "./update-product.component"
import { UpdateProductService } from "./update-product.service"

@NgModule({
  imports: [AppCommonModule],
  declarations: [UpdateProductPageComponent],
  providers: [ProductsService, UpdateProductService]
})
export class UpdateProductPageModule {}
