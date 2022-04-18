import { Injectable } from "@angular/core"
import { ChatMessage, PaginatedChats } from "src/generated-gql-types"
import { ChatEvents } from "../../notifications/chat.events"
import { ExtendedChat } from "./chat.interface"
import { ChatsState } from "./chats.state"

@Injectable({ providedIn: "root" })
export class ManyChatsEventsHandler {
  private chats: ExtendedChat[] = []
  private paginatedChats: PaginatedChats = { data: [], totalResultsCount: 0 }

  constructor(private chatsState: ChatsState, private chatsEvents: ChatEvents) {
    this.handleMessageReceived()
    this.subscribeToChats()
  }

  private handleMessageReceived() {
    this.chatsEvents.messageReceived$.subscribe(receivedMessage => {
      this.updateLastMessage(receivedMessage)
    })
  }

  private updateLastMessage(message: ChatMessage) {
    const chats = this.chats
    const chatIndex = chats.findIndex(chat => chat.id === message.chatId)
    const notFoundIndex = -1
    if (chatIndex === notFoundIndex) {
      return
    }

    this.chats[chatIndex].lastMessage = message.text

    this.emitChats(chats)
  }

  private emitChats(chats: ExtendedChat[]) {
    const { totalResultsCount } = this.paginatedChats
    this.chatsState.chats$.next({ data: chats, totalResultsCount })
  }

  private subscribeToChats() {
    this.chatsState.chats$.subscribe(paginatedChats => {
      this.chats = paginatedChats.data
      this.paginatedChats = paginatedChats
    })
  }
}
