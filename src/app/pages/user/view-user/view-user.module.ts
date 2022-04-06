import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/common.module"
import { UsersModule } from "src/app/features/users/users.module"
import { ViewUserPage } from "./view-user.page"

@NgModule({
  declarations: [ViewUserPage],
  imports: [AppCommonModule, UsersModule]
})
export class ViewUserPageModule {}
