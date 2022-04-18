import { Injectable, OnDestroy } from "@angular/core"
import { ExtendedChat } from "../many/chat.interface"
import { ExtendedChatsFieldsResolver } from "../many/extended-chats.resolver"
import { ConcreteChatLoader } from "./concrete-chat-loader.service"

@Injectable({ providedIn: "root" })
export class ConcreteExtendedChatLoader {
  constructor(
    private chatLoader: ConcreteChatLoader,
    private extendedChatsResolver: ExtendedChatsFieldsResolver
  ) {}

  async loadExtendedChatOrRedirect(chatId: string): Promise<ExtendedChat> {
    const basicChat = await this.chatLoader.loadOwnChatOrRedirect(chatId)

    const nameAndImage = await this.extendedChatsResolver.getChatNameAndImage(basicChat)
    const lastMessage = await this.extendedChatsResolver.getLastMessage(basicChat)

    return { ...basicChat, ...nameAndImage, lastMessage }
  }
}
