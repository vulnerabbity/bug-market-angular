import { Injectable } from "@angular/core"
import { BehaviorSubject, Subject } from "rxjs"
import { ChatMessage, Pagination } from "src/generated-gql-types"
import { CurrentChatState } from "../chats/concrete/current-chat.state"
import { ExtendedChat } from "../chats/many/chat.interface"
import { MessagesLoader } from "./messages-loader.service"

@Injectable({ providedIn: "root" })
export class CurrentChatMessagesState {
  messages: ChatMessage[] = []

  chat: ExtendedChat | null = null

  messages$ = new BehaviorSubject<ChatMessage[]>([])

  private totalMessages = 0

  constructor(private messagesLoader: MessagesLoader, private currentChatState: CurrentChatState) {
    this.subscribeToChat()
    this.subscribeToMessages()
    this.handleQuit()
  }

  async init(chatId: string) {
    await this.initMessages(chatId)
  }

  async loadMore() {
    const chat = this.chat
    const currentMessagesLength = this.messages.length
    const reachedEnd = currentMessagesLength === this.totalMessages

    if (!chat || reachedEnd) {
      return
    }

    this.loadMessages(chat.id, { offset: currentMessagesLength, limit: 25 })
  }

  private async initMessages(chatId: string) {
    this.loadMessages(chatId)
  }

  private async loadMessages(chatId: string, pagination?: Pagination) {
    const { data: paginatedMessages } = await this.messagesLoader.getMessagesResponse(
      chatId,
      pagination
    )
    const { data: newMessages, totalResultsCount } = paginatedMessages!

    this.totalMessages = totalResultsCount
    this.messages.push(...newMessages)
    this.messages$.next(this.messages)
  }

  private subscribeToChat() {
    return this.currentChatState.chat$.subscribe(chat => {
      this.chat = chat
      if (chat) {
        this.init(chat.id)
      }
    })
  }

  private subscribeToMessages() {
    return this.messages$.subscribe(messages => {
      this.messages = messages
    })
  }

  private handleQuit() {
    return this.currentChatState.quit$.subscribe(() => {
      this.messages$.next([])
      this.chat = null
      this.totalMessages = 0
    })
  }
}
