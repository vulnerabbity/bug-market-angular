import { Injectable } from "@angular/core"
import { ChatMessage } from "src/generated-gql-types"
import { CurrentUserState } from "../../users/current-user.state"
import { User } from "../../users/users.interface"

@Injectable({
  providedIn: "root"
})
export class MessageTypeService {
  currentUser: User | null = null

  currentUserSubscription = this.userState.item$.subscribe(user => (this.currentUser = user))

  constructor(private userState: CurrentUserState) {}

  isOutgoingMessage(message: ChatMessage) {
    return !this.isIncomingMessage(message)
  }

  isIncomingMessage(message: ChatMessage): boolean {
    this.validateUser()

    const { userId: senderId } = message
    const { id: currentUserId } = this.currentUser!
    return senderId !== currentUserId
  }

  private validateUser(): void {
    const hasNoUser = this.currentUser === null
    if (hasNoUser) {
      throw new Error("Can't detect message type: has no current user")
    }
  }
}
