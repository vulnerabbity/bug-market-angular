import {
  AbilityUser,
  AppAbility,
  AppAbilityAction,
  AppAbilitySubject,
  ItemWithUserId,
  UserRole
} from "./authorization.interface"
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from "@casl/ability"
import { Injectable } from "@angular/core"
import { TokensService } from "../tokens/tokens.service"
import { UserStatusService } from "../users/user-status.service"
import { Product } from "../products/products.interface"

@Injectable()
export class AuthorizationService {
  private tokensService = new TokensService()
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
      // can manage self products only
      can("manage", Product, { userId })

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

    const { roles, userId } = this.tokensService.parseAccessTokenFromStorage()!
    return { roles, userId }
  }
}
