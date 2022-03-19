import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { MaterialModule } from "../../modules/material.module"
import { CommonPageHeaderComponent } from "../components/page-header/page-header.component"
import { CommonProductCardComponent } from "../components/product-card/product-card.component"
import { CommonProductsContainer } from "../components/products-container/products-container.component"
import { CommonThemedDiv } from "../components/themed-div/themed-div.component"

const passThroughModules = [MaterialModule, CommonModule]
const passThroughComponents = [
  CommonPageHeaderComponent,
  CommonProductCardComponent,
  CommonThemedDiv,
  CommonProductCardComponent,
  CommonProductsContainer
]

@NgModule({
  imports: passThroughModules,
  exports: [...passThroughModules, ...passThroughComponents],
  declarations: [...passThroughComponents]
})
export class AppCommonComponentsModule {}
