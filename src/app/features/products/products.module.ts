import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { GraphqlModule } from "src/app/modules/graphql.module"
import { ProductAbilities } from "./product.abilities"
import { ProductsService } from "./products.service"

@NgModule({
  imports: [CommonModule, GraphqlModule],
  providers: [ProductsService, ProductAbilities],
  exports: []
})
export class ProductsModule {}
