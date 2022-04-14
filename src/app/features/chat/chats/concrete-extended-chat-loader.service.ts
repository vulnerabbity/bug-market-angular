import { Injectable, OnDestroy } from "@angular/core"
import { Chat, GetChatsPaginatedGQL, PaginatedChats, Pagination } from "src/generated-gql-types"
import { CurrentUserState } from "../../users/current-user.state"
import { userDefaults } from "../../users/user.defaults"
import { UsersLoaderService } from "../../users/users-loader.service"
import { User } from "../../users/users.interface"
import { MessagesLoader } from "../messages/messages-loader.service"
import { ExtendedChat, PaginatedExtendedChats } from "./chat.interface"
import { ConcreteChatLoader } from "./concrete-chat-loader.service"
import { ExtendedChatsFieldsResolver } from "./extended-chats.resolver"

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
