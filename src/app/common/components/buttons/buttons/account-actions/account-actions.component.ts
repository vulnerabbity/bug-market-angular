import { Component, OnDestroy } from "@angular/core"
import { distinctUntilChanged } from "rxjs"
import { ChatEvents } from "src/app/features/chat/notifications/chat.events"
import { CurrentUserState } from "src/app/features/users/current-user.state"
import { User } from "src/app/features/users/users.interface"
import { assetsPaths } from "src/assets/assets.paths"

@Component({
  selector: "common-manage-account-button",
  templateUrl: "./account-actions.component.html",
  styleUrls: ["./account-actions.component.scss"]
})
export class CommonManageAccountButtonComponent implements OnDestroy {
  user: User | null = null

  badgeValue = 0

  private totalNotViewedSub = this.subscribeToNotViewedMessages()

  private userSub = this.subscribeToUser()

  constructor(private userState: CurrentUserState, private chatEvents: ChatEvents) {}

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
    this.totalNotViewedSub.unsubscribe()
  }

  getAvatarSource(): string {
    const hasUser = !!this.user
    const defaultAvatar = assetsPaths.NoAvatar
    if (hasUser) {
      return this.user?.avatarUrl ?? defaultAvatar
    }
    return defaultAvatar
  }

  private subscribeToNotViewedMessages() {
    return this.chatEvents.notViewedMessagesTotalChanged$
      .pipe(distinctUntilChanged())
      .subscribe(number => {
        this.badgeValue = number
      })
  }

  private subscribeToUser() {
    return this.userState.item$.subscribe(userOrNull => {
      if (userOrNull) {
        this.user = userOrNull
      }
    })
  }
}
