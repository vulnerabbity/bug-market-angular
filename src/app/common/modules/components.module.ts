import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { MaterialModule } from "../../modules/material.module"
import { CommonPageHeaderComponent } from "../components/page-header/page-header.component"
import { CommonProductCardComponent } from "../components/product-card/product-card.component"
import { CommonProductsContainer } from "../components/products-container/products-container.component"
import { CommonThemedDiv } from "../components/themed-div/themed-div.component"
import { RouterModule } from "@angular/router"
import { CarouselModule } from "ngx-owl-carousel-o"
import { CommonCarousel } from "../components/carousel/carousel.component"
import { CommonDataFieldComponent } from "../components/data-field/data-field.component"
import { CommonTitleTextCardComponent } from "../components/title-text-card/title-text-card.component"

const passThroughModules = [MaterialModule, CommonModule, RouterModule]
const passThroughComponents = [
  CommonPageHeaderComponent,
  CommonProductCardComponent,
  CommonThemedDiv,
  CommonProductCardComponent,
  CommonProductsContainer,
  CommonCarousel,
  CommonDataFieldComponent,
  CommonTitleTextCardComponent
]

@NgModule({
  imports: [passThroughModules, CarouselModule],
  exports: [...passThroughModules, ...passThroughComponents],
  declarations: [...passThroughComponents]
})
export class AppCommonComponentsModule {}
