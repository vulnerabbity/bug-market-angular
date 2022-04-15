import { Injectable } from "@angular/core"
import { BehaviorSubject, Subject } from "rxjs"
import { makeDeepCopy } from "src/app/common/services/deepcopy.service"
import { AppRouterService } from "src/app/common/services/router.service"
import { ChatMessage, Pagination } from "src/generated-gql-types"
import { ExtendedChat } from "./chats/chat.interface"
import { ConcreteExtendedChatLoader } from "./chats/concrete-extended-chat-loader.service"
import { MessagesLoader } from "./messages/messages-loader.service"

@Injectable({ providedIn: "root" })
export class CurrentChatState {
  messages: ChatMessage[] = []

  chat: ExtendedChat | null = null

  chat$ = new BehaviorSubject<ExtendedChat | null>(null)

  messages$ = new BehaviorSubject<ChatMessage[]>([])

  messageSended$ = new Subject<void>()

  private messagesSub = this.messages$.subscribe(messages => (this.messages = messages))
  private chatSub = this.chat$.subscribe(chat => (this.chat = chat))
  private messageSendSub = this.messageSended$.subscribe(() => this.syncLastMessages())

  constructor(
    private appRouter: AppRouterService,
    private chatLoader: ConcreteExtendedChatLoader,
    private messagesLoader: MessagesLoader
  ) {}

  init(chatId: string) {
    this.initChat(chatId)
    this.initMessages(chatId)
  }

  quit() {
    this.appRouter.redirectToChats()
    this.chat$.next(null)
  }

  private async initChat(chatId: string) {
    const chat = await this.chatLoader.loadExtendedChatOrRedirect(chatId)

    this.chat$.next(chat)
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
}
