import { NgModule } from "@angular/core"
import { MaterialModule } from "../../modules/material.module"
import { CommonPageHeaderComponent } from "../components/page-header/page-header.component"

const passThroughModules = [MaterialModule]
const passThroughComponents = [CommonPageHeaderComponent]

@NgModule({
  imports: passThroughModules,
  exports: [...passThroughModules, ...passThroughComponents],
  declarations: [...passThroughComponents]
})
export class AppCommonComponentsModule {}
