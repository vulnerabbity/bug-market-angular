import {
  AbilityUser,
  AppAbility,
  AppAbilityAction,
  AppAbilitySubject
} from "./authorization.interface"
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from "@casl/ability"
import { Injectable } from "@angular/core"
import { UserStatusService } from "../users/user-status.service"
import { Product } from "../products/products.interface"
import { AccessTokensService } from "../tokens/access/access-token.service"
import { User } from "../users/users.interface"

@Injectable()
export class AuthorizationService {
  private accessTokenService = new AccessTokensService()
  private userStatusService = new UserStatusService()

  isAllowed(action: AppAbilityAction, subject: AppAbilitySubject): boolean {
    const ability = this.defineAbilities()
    return ability.can(action, subject)
  }

  defineAbilities() {
    const user: AbilityUser = this.parseAbilityUserFromStorage()
    const { roles, userId } = user

    const { can, rules, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>
    )

    if (roles.includes("super admin")) {
      can("manage", "all")
    }
    if (roles.includes("admin")) {
      can("manage", "all")
    }

    if (roles.includes("seller")) {
      // can manage self subjects only
      can("manage", Product, { userId })
      can("manage", User, { id: userId })

      can("create", Product)
    }

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<AppAbilitySubject>
    })
  }

  private parseAbilityUserFromStorage(): AbilityUser {
    const isUserLoggedIn = this.userStatusService.isAuthenticated()

    if (isUserLoggedIn === false) {
      return { roles: [], userId: "none" }
    }

    const { roles, userId } = this.accessTokenService.getTokenPayloadFromStorageOrNull()!
    return { roles, userId }
  }
}
