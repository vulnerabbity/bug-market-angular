import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { GraphqlModule } from "src/app/modules/graphql.module"
import { ProductsService } from "./products.service"

@NgModule({
  imports: [CommonModule, GraphqlModule],
  providers: [ProductsService],
  exports: []
})
export class ProductsModule {}
