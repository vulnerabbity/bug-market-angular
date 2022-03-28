import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/modules/common.module"
import { CreateProductPageComponent } from "./create-product.component"

@NgModule({
  imports: [AppCommonModule],
  declarations: [CreateProductPageComponent]
})
export class CreateProductPageModule {}
