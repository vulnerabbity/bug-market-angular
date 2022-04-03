import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AppCommonComponentsModule } from "../components/components.module"
import { AppCommonServicesModule } from "../services/services.module"

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
