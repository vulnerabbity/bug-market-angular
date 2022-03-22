import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/modules/common.module"
import { UsersModule } from "src/app/features/users/users.module"
import { UserPageComponent } from "./user-page.component"

@NgModule({
  declarations: [UserPageComponent],
  imports: [AppCommonModule, UsersModule]
})
export class UserPageModule {}
