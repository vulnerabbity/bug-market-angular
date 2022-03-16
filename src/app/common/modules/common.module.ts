import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { AppCommonComponentsModule } from "./components.module"

const passThroughModules = [CommonModule, AppCommonComponentsModule]

@NgModule({
  imports: passThroughModules,
  exports: passThroughModules
})
export class AppCommonModule {}
