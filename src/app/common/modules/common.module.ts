import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { AppCommonComponentsModule } from "./components.module"

const passThroughModules = [CommonModule, FormsModule, AppCommonComponentsModule]

@NgModule({
  imports: passThroughModules,
  exports: passThroughModules
})
export class AppCommonModule {}
