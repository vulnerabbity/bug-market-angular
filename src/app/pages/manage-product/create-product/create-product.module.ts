import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/modules/common.module"
import { AppFilepondModule } from "src/app/modules/filepond-module"
import { CreateProductPageComponent } from "./create-product.component"

@NgModule({
  imports: [AppCommonModule, AppFilepondModule],
  declarations: [CreateProductPageComponent]
})
export class CreateProductPageModule {}
