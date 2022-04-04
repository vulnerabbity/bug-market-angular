import { NgModule } from "@angular/core"
import { AppCommonComponentsModule } from "src/app/common/components/components.module"
import { PreferencesPageComponent } from "./preferences-page.component"

@NgModule({
  imports: [AppCommonComponentsModule],
  declarations: [PreferencesPageComponent]
})
export class PreferencesPageModule {}
