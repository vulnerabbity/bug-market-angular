import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AppCommonComponentsModule } from "./components.module"
import { AppCommonServicesModule } from "./services.module"

const passThroughModules = [
  CommonModule,
  FormsModule,
  AppCommonComponentsModule,
  AppCommonServicesModule
]

@NgModule({
  imports: passThroughModules,
  exports: passThroughModules
})
export class AppCommonModule {}
