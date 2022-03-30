import { NgModule, Provider } from "@angular/core"
import { Ability, PureAbility } from "@casl/ability"
import { AbilityModule } from "@casl/angular"
import { AuthorizationService } from "./authorization.service"

@NgModule({
  imports: [AbilityModule],
  providers: [AuthorizationService]
})
export class AppAuthorizationModule {}
