import { Component, Input, OnDestroy } from "@angular/core"
import { MaterialColor } from "src/app/common/interfaces/material.interface"
import { CurrentUserState } from "src/app/features/users/current-user.state"
import { User } from "src/app/features/users/users.interface"
import { ChatMessage } from "src/generated-gql-types"

@Component({
  selector: "common-chat-text-message[message]",
  templateUrl: "./chat-text-message.component.html",
  styleUrls: ["./chat-text-message.component.scss"]
})
export class CommonChatTextMessageComponent implements OnDestroy {
  currentUser: User | null = null

  @Input()
  message!: ChatMessage

  @Input()
  color: "accent" | "primary" = "primary"

  private currentUserSub = this.subscribeToUser()

  constructor(private currentUserState: CurrentUserState) {}

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe()
  }

  isViewedByOthers() {
    const currentId = this.currentUser?.id ?? ""
    const otherViewers = this.message.viewedBy.filter(viewerId => viewerId !== currentId)

    const hasViewers = otherViewers.length > 0
    return hasViewers
  }

  isViewedByCurrentUser(): boolean {
    const currentUser = this.currentUser
    if (!currentUser) {
      return false
    }

    return this.message.viewedBy.includes(currentUser.id)
  }

  private subscribeToUser() {
    return this.currentUserState.item$.subscribe(currentUser => (this.currentUser = currentUser))
  }
}
