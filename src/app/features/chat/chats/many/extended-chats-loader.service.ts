import { Injectable } from "@angular/core"
import { Chat, Pagination } from "src/generated-gql-types"
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
      const resolvedFields = await this.resolveParallel(basicChat)

      extendedChats.push({ ...basicChat, ...resolvedFields })
    }

    return { totalResultsCount, data: extendedChats }
  }

  private async resolveParallel(basicChat: Chat) {
    // make requests at same time and await all results later
    const nameAndImagePromise = this.extendedChatResolver.getChatNameAndImage(basicChat)
    const lastMessagePromise = this.extendedChatResolver.getLastMessage(basicChat)
    const notViewedMessagesPromise = this.extendedChatResolver.getNotViewedMessagesNumber(basicChat)

    const result = await Promise.all([
      nameAndImagePromise,
      lastMessagePromise,
      notViewedMessagesPromise
    ])

    const { "0": nameAndImage, "1": lastMessage, "2": notViewedMessages } = result

    return { ...nameAndImage, lastMessage, notViewedMessages }
  }
}
