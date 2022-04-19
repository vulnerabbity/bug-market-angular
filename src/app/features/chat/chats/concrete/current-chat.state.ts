import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { AppRouterService } from "src/app/common/services/router.service"
import { ChatMessage } from "src/generated-gql-types"
import { ExtendedChat } from "../many/chat.interface"
import { ConcreteExtendedChatLoader } from "./concrete-extended-chat-loader.service"

@Injectable({ providedIn: "root" })
export class CurrentChatState {
  messages: ChatMessage[] = []

  chat: ExtendedChat | null = null

  chat$ = new BehaviorSubject<ExtendedChat | null>(null)

  private chatSub = this.chat$.subscribe(chat => {
    this.chat = chat
  })

  constructor(
    private appRouter: AppRouterService,
    private chatLoader: ConcreteExtendedChatLoader
  ) {}

  init(chatId: string) {
    this.initChat(chatId)
  }

  quit() {
    this.appRouter.redirectToChats()
    this.chat$.next(null)
  }

  private async initChat(chatId: string) {
    const chat = await this.chatLoader.loadExtendedChatOrRedirect(chatId)

    this.chat$.next(chat)
  }
}
