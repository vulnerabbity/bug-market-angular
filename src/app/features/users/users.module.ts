import { NgModule } from "@angular/core"
import { LocalUserService } from "./local-user.service"
import { UpdateUserService } from "./update-user.service"
import { UsersLoaderService } from "./user-loader.service"
import { UserStatusService } from "./user-status.service"
import { UserAbilities } from "./users-abilities.service"
import { UsersService } from "./users.service"

@NgModule({
  providers: [
    UsersService,
    UsersLoaderService,
    UpdateUserService,
    LocalUserService,
    UserStatusService,
    UserAbilities
  ]
})
export class UsersModule {}
