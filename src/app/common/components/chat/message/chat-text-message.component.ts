import { Component, Input } from "@angular/core"
import { ChatMessage } from "src/generated-gql-types"

@Component({
  selector: "common-chat-text-message[message]",
  templateUrl: "./chat-text-message.component.html",
  styleUrls: ["./chat-text-message.component.scss"]
})
export class CommonChatTextMessageComponent {
  @Input()
  message!: ChatMessage

  @Input()
  color: "accent" | "primary" = "primary"

  constructor() {}

  isViewedByOthers() {
    const senderId = this.message.userId
    const otherViewers = this.message.viewedBy.filter(viewerId => viewerId !== senderId)

    const hasViewers = otherViewers.length > 0
    return hasViewers
  }

  isViewedBySender(): boolean {
    const senderId = this.message.userId
    if (!senderId) {
      return false
    }

    return this.message.viewedBy.includes(senderId)
  }
}
