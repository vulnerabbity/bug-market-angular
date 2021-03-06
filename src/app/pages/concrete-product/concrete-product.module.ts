import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/common.module"
import { ProductsModule } from "src/app/features/products/products.module"
import { ConcreteProductPageAuthorComponent } from "./author/author.component"
import { ConcreteProductPageComponent } from "./concrete-product.component"
import { ConcreteProductPageDataFieldsComponent } from "./data-fields/data-fields.component"

@NgModule({
  imports: [AppCommonModule, ProductsModule],
  declarations: [
    ConcreteProductPageComponent,
    ConcreteProductPageDataFieldsComponent,
    ConcreteProductPageAuthorComponent
  ]
})
export class ConcreteProductPageModule {}
