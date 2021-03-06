import { Injectable } from "@angular/core"
import { ChatMessage } from "src/generated-gql-types"
import { ChatEvents } from "../../notifications/chat.events"
import { ExtendedChat } from "../many/chat.interface"
import { ConcreteChatsUpdaterService } from "./concrete-chat-updater.service"
import { CurrentChatState } from "./current-chat.state"

@Injectable({ providedIn: "root" })
export class ConcreteChatEventsHandler {
  private currentChat: ExtendedChat | null = null

  constructor(
    private chatUpdater: ConcreteChatsUpdaterService,
    private chatEvents: ChatEvents,
    private currentChatState: CurrentChatState
  ) {
    this.startHandling()
  }

  private startHandling() {
    this.subscribeToChat()
    this.viewMessagesOnReceive()
    this.handleChatDeleted()
  }

  private viewMessagesOnReceive() {
    this.chatEvents.messageReceived$.subscribe(newMessage => {
      const isMessageForCurrentChat = this.isMessageForCurrentChat(newMessage)
      if (isMessageForCurrentChat) {
        this.chatUpdater.viewMessages(this.currentChat!.id)
      }
    })
  }

  private handleChatDeleted() {
    this.chatEvents.chatDeleted$.subscribe(deletedChat => {
      const currentChat = this.currentChat

      const hasNoCurrentChat = !currentChat
      if (hasNoCurrentChat) {
        return
      }

      const isCurrentChat = currentChat.id === deletedChat.id

      if (isCurrentChat) {
        this.currentChatState.quit()
      }
    })
  }

  private subscribeToChat() {
    return this.currentChatState.chat$.subscribe(chat => {
      this.currentChat = chat
    })
  }
  private isMessageForCurrentChat(newMessage: ChatMessage) {
    return this.currentChat?.id === newMessage.chatId
  }
}
