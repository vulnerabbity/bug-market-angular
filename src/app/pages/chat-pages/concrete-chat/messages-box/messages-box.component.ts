import { Component, Input, OnDestroy } from "@angular/core"
import { CurrentChatState } from "src/app/features/chat/current-chat.state"
import { MessageTypeService } from "src/app/features/chat/messages/message-type.service"
import { CurrentUserState } from "src/app/features/users/current-user.state"
import { User } from "src/app/features/users/users.interface"
import { Chat, ChatMessage } from "src/generated-gql-types"

export type MessageClass = "message__incoming" | "message__outgoing"

@Component({
  selector: "concrete-chat__messages-box",
  templateUrl: "./messages-box.component.html",
  styleUrls: ["./messages-box.component.scss"]
})
export class MessagesBoxComponent implements OnDestroy {
  messages: ChatMessage[] = []

  messagesSubscription = this.chatState.messages$.subscribe(messages => {
    this.messages = messages
  })

  constructor(
    private chatState: CurrentChatState,
    private messageTypeService: MessageTypeService
  ) {}

  getMessageClass(message: ChatMessage): MessageClass {
    const isIncoming = this.isIncomingMessage(message)
    return isIncoming ? "message__incoming" : "message__outgoing"
  }

  getMessageColor(message: ChatMessage) {
    const isIncoming = this.isIncomingMessage(message)
    return isIncoming ? "accent" : "primary"
  }

  private isIncomingMessage(message: ChatMessage): boolean {
    return this.messageTypeService.isIncomingMessage(message)
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe()
  }
}
