import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ProductAbilities } from "./product.abilities"
import { ProductsImagesService } from "./products-images.service"
import { ProductsService } from "./products.service"

@NgModule({
  imports: [CommonModule],
  providers: [ProductsService, ProductAbilities, ProductsImagesService],
  exports: []
})
export class ProductsModule {}
