import { NgModule } from "@angular/core"
import { AppCommonModule } from "src/app/common/common.module"
import { UsersModule } from "src/app/features/users/users.module"
import { EditUserPage } from "./edit-user.page"

@NgModule({
  imports: [AppCommonModule, UsersModule],
  declarations: [EditUserPage]
})
export class EditUserModule {}
