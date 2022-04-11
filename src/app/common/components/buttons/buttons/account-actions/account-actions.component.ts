import { Component, OnDestroy } from "@angular/core"
import { User } from "src/app/features/users/users.interface"
import { CurrentUserState } from "src/app/state/current-user.state"
import { assetsPaths } from "src/assets/assets.paths"

@Component({
  selector: "common-manage-account-button",
  templateUrl: "./account-actions.component.html",
  styleUrls: ["./account-actions.component.scss"]
})
export class CommonManageAccountButtonComponent implements OnDestroy {
  user?: User

  userSubscription = this.userState.item$.subscribe(userOrNull => {
    if (userOrNull) {
      this.user = userOrNull
    }
  })

  constructor(private userState: CurrentUserState) {}

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  getAvatarSource(): string {
    const hasUser = !!this.user
    const defaultAvatar = assetsPaths.NoAvatar
    if (hasUser) {
      return this.user?.avatarUrl ?? defaultAvatar
    }
    return defaultAvatar
  }
}
