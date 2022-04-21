import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { AppRouterService } from "src/app/common/services/router.service"
import { ChatMessage } from "src/generated-gql-types"
import { ExtendedChat } from "../many/chat.interface"
import { ConcreteChatDeleterService } from "./concrete-chat-deleter.service"
import { ConcreteExtendedChatLoader } from "./concrete-extended-chat-loader.service"

@Injectable({ providedIn: "root" })
export class CurrentChatState {
  messages: ChatMessage[] = []

  chat: ExtendedChat | null = null

  chat$ = new BehaviorSubject<ExtendedChat | null>(null)

  private chatSub = this.subscribeToChat()

  constructor(
    private appRouter: AppRouterService,
    private chatLoader: ConcreteExtendedChatLoader,
    private chatDeleter: ConcreteChatDeleterService
  ) {}

  init(chatId: string) {
    this.initChat(chatId)
  }

  quit() {
    this.appRouter.redirectToChats()
    this.chat$.next(null)
  }

  async delete() {
    const chat = this.chat
    const hasNoChat = !chat
    if (hasNoChat) {
      return
    }
    await this.chatDeleter.deleteChatResponse(chat.id)
  }

  private async initChat(chatId: string) {
    const chat = await this.chatLoader.loadExtendedChatOrRedirect(chatId)

    this.chat$.next(chat)
  }

  private subscribeToChat() {
    return this.chat$.subscribe(chat => {
      this.chat = chat
    })
  }
}
