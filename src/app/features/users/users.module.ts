import { NgModule } from "@angular/core"
import { LocalUserService } from "./local-user.service"
import { UsersUpdaterService } from "./users-updater.service"
import { UsersLoaderService } from "./user-loader.service"
import { UserStatusService } from "./user-status.service"
import { UserAbilities } from "./users-abilities.service"
import { UsersCreatorService } from "./users-creator.service"

@NgModule({
  providers: [
    UsersCreatorService,
    UsersLoaderService,
    UsersUpdaterService,
    LocalUserService,
    UserStatusService,
    UserAbilities
  ]
})
export class UsersModule {}
