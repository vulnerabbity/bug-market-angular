import { NgModule } from "@angular/core"
import { AppCommonComponentsModule } from "./components.module"

const passThroughModules = [AppCommonComponentsModule]

@NgModule({
  imports: passThroughModules,
  exports: passThroughModules
})
export class AppCommonModule {}
