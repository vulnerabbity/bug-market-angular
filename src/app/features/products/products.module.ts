import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ProductAbilities } from "./product.abilities"
import { ProductsImagesService } from "./products-images.service"
import { ProductsLoaderService } from "./products-loader.service"
import { ProductsService } from "./products.service"

@NgModule({
  imports: [CommonModule],
  providers: [ProductsService, ProductAbilities, ProductsImagesService, ProductsLoaderService],
  exports: []
})
export class ProductsModule {}
