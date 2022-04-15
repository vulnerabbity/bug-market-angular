import { Injectable } from "@angular/core"
import { BehaviorSubject, Subject } from "rxjs"
import { makeDeepCopy } from "src/app/common/services/deepcopy.service"
import { ChatMessage, Pagination } from "src/generated-gql-types"
import { ExtendedChat } from "../chats/chat.interface"
import { CurrentChatState } from "../chats/current-chat.state"
import { MessagesLoader } from "./messages-loader.service"

@Injectable({ providedIn: "root" })
export class CurrentChatMessagesState {
  messages: ChatMessage[] = []

  chat: ExtendedChat | null = null

  messages$ = new BehaviorSubject<ChatMessage[]>([])

  messageSended$ = new Subject<void>()

  private chatSub = this.subscribeToChat()
  private messagesSub = this.subscribeToMessages()
  private messageSendSub = this.messageSended$.subscribe(() => this.syncLastMessages())

  constructor(private messagesLoader: MessagesLoader, private currentChatState: CurrentChatState) {}

  init(chatId: string) {
    this.initMessages(chatId)
  }

  private async initMessages(chatId: string) {
    const { data: paginatedMessages } = await this.messagesLoader.getMessagesResponse(chatId)
    const { data: messages } = paginatedMessages!

    this.messages$.next(messages)
  }

  private async syncLastMessages(amount = 10) {
    const chat = this.chat!
    const pagination: Pagination = { offset: 0, limit: amount }

    const { data: paginatedMessages } = await this.messagesLoader.getMessagesResponse(
      chat.id,
      pagination
    )
    if (paginatedMessages) {
      const { data: newMessages } = paginatedMessages
      this.replaceLastMessages(newMessages)
    }
  }

  private replaceLastMessages(newMessages: ChatMessage[]) {
    const messages = makeDeepCopy(this.messages)
    const amount = newMessages.length

    messages.splice(0, amount, ...newMessages)
    this.messages$.next(messages)
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
}
