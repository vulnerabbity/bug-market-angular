import { Injectable } from "@angular/core"
import { ChatMessage, PaginatedChats } from "src/generated-gql-types"
import { ChatEvents } from "../../notifications/chat.events"
import { ConcreteExtendedChatLoader } from "../concrete/concrete-extended-chat-loader.service"
import { ExtendedChat } from "./chat.interface"
import { ChatsState } from "./chats.state"
import { ExtendedChatsFieldsResolver } from "./extended-chats.resolver"

@Injectable({ providedIn: "root" })
export class ManyChatsEventsHandler {
  private chats: ExtendedChat[] = []
  private paginatedChats: PaginatedChats = { data: [], totalResultsCount: 0 }

  constructor(
    private chatsState: ChatsState,
    private chatsEvents: ChatEvents,
    private chatLoader: ConcreteExtendedChatLoader
  ) {
    this.handleMessageReceived()
    this.handleUpdateNotViewedMessages()

    this.handleChatDeleted()
    this.handleChatCreated()

    this.subscribeToChats()
  }

  private handleMessageReceived() {
    this.chatsEvents.messageReceived$.subscribe(receivedMessage => {
      this.updateLastMessage(receivedMessage)
    })
  }

  private handleUpdateNotViewedMessages() {
    this.chatsEvents.concreteChatNotViewedMessagesChanged$.subscribe(response => {
      const { chatId, number } = response
      this.updateNotViewedNumber(chatId, number)
    })
  }

  private handleChatDeleted() {
    this.chatsEvents.chatDeleted$.subscribe(deletedChat => {
      const newChats = this.chats.filter(chat => deletedChat.id !== chat.id)
      this.emitChats(newChats)
    })
  }

  private handleChatCreated() {
    this.chatsEvents.chatCreated$.subscribe(async createdChat => {
      const createdExtendedChat = await this.chatLoader.loadExtendedChatOrRedirect(createdChat.id)

      this.emitChats([...this.chats, createdExtendedChat])
    })
  }

  private updateNotViewedNumber(chatId: string, newNumber: number) {
    const chatIndex = this.findChatIndexOrNull(chatId)

    if (chatIndex !== null) {
      this.chats[chatIndex].notViewedMessages = newNumber
      this.emitChats(this.chats)
    }
  }

  private updateLastMessage(message: ChatMessage) {
    const chatIndex = this.findChatIndexOrNull(message.chatId)
    const chatNotFetched = chatIndex === null
    if (chatNotFetched) {
      return
    }
    let chats = this.chats

    const updatedChat = chats[chatIndex]
    updatedChat.lastMessage = message.text

    chats = chats.filter(chat => chat.id !== message.chatId)

    chats.unshift(updatedChat)

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

  private findChatIndexOrNull(chatIdToSearch: string): number | null {
    const chats = this.chats
    const chatIndex = chats.findIndex(chat => chat.id === chatIdToSearch)
    const notFoundIndex = -1
    if (chatIndex === notFoundIndex) {
      return null
    }

    return chatIndex
  }
}
