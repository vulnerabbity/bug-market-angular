import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { MaterialModule } from "../../modules/material.module"
import { CommonPageHeaderComponent } from "../components/page-header/page-header.component"
import { CommonProductCardComponent } from "../components/product-card/product-card.component"
import { CommonThemedDiv } from "../components/themed-div/themed-div.component"

const passThroughModules = [MaterialModule, CommonModule]
const passThroughComponents = [
  CommonPageHeaderComponent,
  CommonProductCardComponent,
  CommonThemedDiv
]

@NgModule({
  imports: passThroughModules,
  exports: [...passThroughModules, ...passThroughComponents],
  declarations: [...passThroughComponents]
})
export class AppCommonComponentsModule {}
