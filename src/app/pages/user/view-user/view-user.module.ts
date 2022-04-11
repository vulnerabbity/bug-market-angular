import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/common.module"
import { UserProfileComponent } from "./user-profile/user-profile.component"
import { ViewUserPage } from "./view-user.page"

@NgModule({
  declarations: [ViewUserPage, UserProfileComponent],
  imports: [AppCommonModule]
})
export class ViewUserPageModule {}
