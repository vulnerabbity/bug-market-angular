import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/modules/common.module"
import { HomePageComponent } from "./home-page.component"

@NgModule({
  imports: [AppCommonModule],
  declarations: [HomePageComponent]
})
export class HomePageModule {}
