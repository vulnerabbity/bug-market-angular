import { Injectable } from "@angular/core"
import { BehaviorSubject, from, Observable } from "rxjs"
import { LocalUserService } from "../features/users/local-user.service"
import { UsersLoaderService } from "../features/users/users-loader.service"
import { User } from "../features/users/users.interface"
import { ReactiveState } from "./state.interface"

@Injectable({
  providedIn: "root"
})
export class CurrentUserState implements ReactiveState<User> {
  subject$ = new BehaviorSubject<null | User>(null)

  item$: Observable<User | null> = from(this.subject$)

  constructor(private usersLoader: UsersLoaderService, private localUserService: LocalUserService) {
    this.initState()
  }

  setItem(input: User) {
    this.subject$.next(input)
  }

  private async initState(): Promise<void> {
    const userIdOrNull = this.localUserService.getUserIdOrNull()
    if (userIdOrNull) {
      const userId = userIdOrNull

      const currentUser = await this.usersLoader.loadUserOrRedirect({ id: userId })
      this.setItem(currentUser)
    }
  }
}
