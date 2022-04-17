import { Injectable } from "@angular/core"
import { ChatMessage } from "src/generated-gql-types"
import { WebsocketsService } from "../../websockets/ws.service"
import { ChatEvents } from "../notifications/chat.events"
import { ExtendedChat } from "./chat.interface"
import { CurrentChatState } from "./current-chat.state"

@Injectable({ providedIn: "root" })
export class ConcreteChatsUpdaterService {
  currentChat: ExtendedChat | null = null

  private socket = this.ws.getSocket()

  constructor(
    private ws: WebsocketsService,
    private chatEvents: ChatEvents,
    private currentChatState: CurrentChatState
  ) {
    this.currentChatState.chat$.subscribe(chat => (this.currentChat = chat))

    this.viewMessagesOnOpen()
    this.viewMessagesOnReceive()
  }

  viewMessages(chatId: string) {
    console.log("viewed")
    this.socket.emit("markChatViewed", { chatId })
  }

  private viewMessagesOnOpen() {
    this.chatEvents.chatOpened$.subscribe(chat => this.viewMessages(chat.id))
  }

  private viewMessagesOnReceive() {
    this.chatEvents.messageReceived$.subscribe(newMessage => {
      const isMessageForCurrentChat = this.isMessageForCurrentChat(newMessage)
      if (isMessageForCurrentChat) {
        this.viewMessages(this.currentChat!.id)
      }
    })
  }

  private isMessageForCurrentChat(newMessage: ChatMessage) {
    return this.currentChat?.id === newMessage.chatId
  }
}
