import { Injectable } from "@angular/core"
import { CurrentUserState } from "src/app/features/users/current-user.state"
import { userDefaults } from "src/app/features/users/user.defaults"
import { UsersLoaderService } from "src/app/features/users/users-loader.service"
import { User } from "src/app/features/users/users.interface"
import { Chat } from "src/generated-gql-types"
import { MessagesLoader } from "../../messages/messages-loader.service"
import { ChatMessagesNumberLoader } from "../../messages/messages-number-loader"
import { ExtendedChat } from "./chat.interface"

@Injectable({
  providedIn: "root"
})
export class ExtendedChatsFieldsResolver {
  private currentUserId: string | null = this.currentUserState.getUserIdOrNul()

  constructor(
    private usersLoader: UsersLoaderService,
    private messagesLoader: MessagesLoader,
    private messagesNumberLoader: ChatMessagesNumberLoader,
    private currentUserState: CurrentUserState
  ) {}

  async getChatNameAndImage(chat: Chat) {
    const peerId = this.getChatPeerId(chat)

    const { data: peer } = await this.usersLoader.loadUserResponse({ id: peerId })

    const chatName = peer?.name ?? userDefaults.name
    const chatImage = peer?.avatarUrl as string | undefined

    return { chatName, chatImage }
  }

  async getLastMessage(chat: Chat | ExtendedChat): Promise<string | undefined> {
    const { data: lastMessage } = await this.messagesLoader.getLastMessageResponse(chat.id)

    const lastText = lastMessage?.text

    return lastText
  }

  async getNotViewedMessagesNumber(chat: Chat | ExtendedChat): Promise<number> {
    const notViewed = await this.messagesNumberLoader.getPerChat(chat.id)

    return notViewed
  }

  getChatPeerId(chat: Chat): string {
    const currentUserId = this.currentUserId!

    const otherPeers = chat.peersIds.filter(peerId => peerId !== currentUserId)
    const peerId = otherPeers[0] ?? currentUserId

    return peerId
  }
}
