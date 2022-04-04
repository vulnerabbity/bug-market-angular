import { NgModule } from "@angular/core"
import { LocalUserService } from "./local-user.service"
import { UserStatusService } from "./user-status.service"
import { UsersService } from "./users.service"

@NgModule({
  providers: [UsersService, LocalUserService, UserStatusService]
})
export class UsersModule {}
