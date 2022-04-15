import { Injectable } from "@angular/core"
import { BehaviorSubject, from, Observable } from "rxjs"
import { ReactiveState } from "src/app/common/interfaces/state.interface"
import { AppRouterService } from "src/app/common/services/router.service"
import { AuthenticationService } from "../authentication/authentication.service"
import { LocalUserService } from "./local-user.service"
import { UsersLoaderService } from "./users-loader.service"
import { User } from "./users.interface"

@Injectable({
  providedIn: "root"
})
export class CurrentUserState implements ReactiveState<User | null> {
  subject$ = new BehaviorSubject<null | User>(null)

  item$: Observable<User | null> = from(this.subject$)

  constructor(
    private usersLoader: UsersLoaderService,
    private localUserService: LocalUserService,
    private authenticationService: AuthenticationService,
    private appRouter: AppRouterService
  ) {
    this.initState()
  }

  setItem(input: User | null) {
    this.subject$.next(input)
  }

  async logout() {
    this.appRouter.redirectHome()
    this.authenticationService.logout()
    this.setItem(null)
  }

  async fetchState() {
    const userIdOrNull = this.localUserService.getUserIdOrNull()
    if (userIdOrNull) {
      const userId = userIdOrNull

      const currentUser = await this.usersLoader.loadUserOrRedirect({ id: userId })
      this.setItem(currentUser)
    }
  }

  private async initState() {
    await this.fetchState()
  }
}
