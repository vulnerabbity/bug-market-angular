import {
  AbilityUser,
  AppAbility,
  AppAbilityAction,
  AppAbilitySubject
} from "./authorization.interface"
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from "@casl/ability"
import { Injectable, OnDestroy } from "@angular/core"
import { Product } from "../products/products.interface"
import { AccessTokensService } from "../tokens/access/access-token.service"
import { User } from "../users/users.interface"
import { CurrentUserState } from "../users/current-user.state"

@Injectable()
export class AuthorizationService implements OnDestroy {
  private accessTokenService = new AccessTokensService()

  private currentUser!: User | null

  private currentUserSubscription = this.userState.item$.subscribe(
    currentUser => (this.currentUser = currentUser)
  )

  constructor(private userState: CurrentUserState) {}

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }

  isAllowed(action: AppAbilityAction, subject: AppAbilitySubject): boolean {
    const ability = this.defineAbilities()
    return ability.can(action, subject)
  }

  defineAbilities() {
    const user: AbilityUser = this.getAbilityUser()
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

  private getAbilityUser(): AbilityUser {
    const currentUser = this.currentUser

    if (!currentUser) {
      return { roles: [], userId: "none" }
    }

    const { roles, userId } = this.accessTokenService.getTokenPayloadFromStorageOrNull()!
    return { roles, userId }
  }
}
