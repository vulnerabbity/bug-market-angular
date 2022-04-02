import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { GraphqlModule } from "src/app/modules/graphql.module"
import { ProductAbilities } from "./product.abilities"
import { ProductsImagesService } from "./products-images.service"
import { ProductsService } from "./products.service"

@NgModule({
  imports: [CommonModule, GraphqlModule],
  providers: [ProductsService, ProductAbilities, ProductsImagesService],
  exports: []
})
export class ProductsModule {}
