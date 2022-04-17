import { Injectable, OnDestroy } from "@angular/core"
import { ExtendedChatsFieldsResolver } from "../many/extended-chats.resolver"
import { ConcreteChatLoader } from "./concrete-chat-loader.service"

@Injectable({ providedIn: "root" })
export class ConcreteExtendedChatLoader {
  constructor(
    private chatLoader: ConcreteChatLoader,
    private extendedChatsResolver: ExtendedChatsFieldsResolver
  ) {}

  async loadExtendedChatOrRedirect(chatId: string) {
    const basicChat = await this.chatLoader.loadOwnChatOrRedirect(chatId)

    let extendedChat = await this.extendedChatsResolver.resolveChatNameAndAvatar(basicChat)
    extendedChat = await this.extendedChatsResolver.resolveLastMessage(extendedChat)

    return extendedChat
  }
}
