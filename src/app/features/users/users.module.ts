import { NgModule } from "@angular/core"
import { LocalUserService } from "./local-user.service"
import { UsersUpdaterService } from "./users-updater.service"
import { UsersLoaderService } from "./users-loader.service"
import { UserAbilities } from "./users-abilities.service"
import { UsersCreatorService } from "./users-creator.service"

@NgModule({
  providers: [
    UsersCreatorService,
    UsersLoaderService,
    UsersUpdaterService,
    LocalUserService,
    UserAbilities
  ]
})
export class UsersModule {}
