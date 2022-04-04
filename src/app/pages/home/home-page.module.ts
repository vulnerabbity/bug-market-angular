import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/common.module"
import { HomepageHeaderComponent } from "./header/header.component"
import { HomePageComponent } from "./home-page.component"

@NgModule({
  imports: [AppCommonModule],
  declarations: [HomePageComponent, HomepageHeaderComponent]
})
export class HomePageModule {}
