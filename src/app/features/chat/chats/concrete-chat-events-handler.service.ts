import { Injectable } from "@angular/core"
import { ChatMessage } from "src/generated-gql-types"
import { ChatEvents } from "../notifications/chat.events"
import { ExtendedChat } from "./chat.interface"
import { ConcreteChatsUpdaterService } from "./concrete-chat-updater.service"
import { CurrentChatState } from "./current-chat.state"

@Injectable({ providedIn: "root" })
export class ConcreteChatEventsHandler {
  private currentChat: ExtendedChat | null = null
  private started = false

  constructor(
    private chatUpdater: ConcreteChatsUpdaterService,
    private chatEvents: ChatEvents,
    private currentChatState: CurrentChatState
  ) {}

  startHandling() {
    if (this.started) {
      return
    }

    this.currentChatState.chat$.subscribe(chat => {
      this.currentChat = chat
    })

    this.viewMessagesOnOpen()
    this.viewMessagesOnReceive()
  }

  private viewMessagesOnOpen() {
    this.chatEvents.chatOpened$.subscribe(chat => this.chatUpdater.viewMessages(chat.id))
  }

  private viewMessagesOnReceive() {
    this.chatEvents.messageReceived$.subscribe(newMessage => {
      const isMessageForCurrentChat = this.isMessageForCurrentChat(newMessage)
      if (isMessageForCurrentChat) {
        this.chatUpdater.viewMessages(this.currentChat!.id)
      }
    })
  }

  private isMessageForCurrentChat(newMessage: ChatMessage) {
    return this.currentChat?.id === newMessage.chatId
  }
}
