import { Injectable, OnDestroy } from "@angular/core"
import { Chat, GetChatsPaginatedGQL, PaginatedChats, Pagination } from "src/generated-gql-types"
import { ExtendedChat, PaginatedExtendedChats } from "./chat.interface"
import { ChatsLoaderService } from "./chats-loader.service"
import { ExtendedChatsFieldsResolver } from "./extended-chats.resolver"

@Injectable({ providedIn: "root" })
export class ExtendedChatsLoader {
  constructor(
    private chatsLoader: ChatsLoaderService,
    private extendedChatResolver: ExtendedChatsFieldsResolver
  ) {}

  async loadOwnExtendedChats(pagination?: Pagination): Promise<PaginatedExtendedChats> {
    const paginatedBasicChats = await this.chatsLoader.loadOwnChats(pagination)
    const { data: basicChats, totalResultsCount } = paginatedBasicChats

    const extendedChats: ExtendedChat[] = []
    for (let basicChat of basicChats) {
      let chat = await this.extendedChatResolver.resolveChatNameAndAvatar(basicChat)
      chat = await this.extendedChatResolver.resolveLastMessage(chat)
      extendedChats.push(chat)
    }

    return { totalResultsCount, data: extendedChats }
  }
}
