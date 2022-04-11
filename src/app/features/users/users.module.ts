import { NgModule } from "@angular/core"
import { LocalUserService } from "./local-user.service"
import { UsersUpdaterService } from "./users-updater.service"
import { UsersLoaderService } from "./users-loader.service"
import { UserAbilities } from "./users-abilities.service"
import { UsersCreatorService } from "./users-creator.service"
import { CurrentUserState } from "./current-user.state"

@NgModule({
  providers: [
    UsersCreatorService,
    UsersLoaderService,
    UsersUpdaterService,
    LocalUserService,
    UserAbilities,
    CurrentUserState
  ]
})
export class UsersModule {}
