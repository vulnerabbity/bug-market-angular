import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/modules/common.module"
import { ProductsService } from "src/app/features/products/products.service"
import { AppFilepondModule } from "src/app/modules/filepond-module"
import { UpdateProductPageComponent } from "./update-product.component"
import { UpdateProductService } from "./update-product.service"

@NgModule({
  imports: [AppCommonModule, AppFilepondModule],
  declarations: [UpdateProductPageComponent],
  providers: [ProductsService, UpdateProductService]
})
export class UpdateProductPageModule {}
