import { Injectable } from "@angular/core"
import { CurrentUserState } from "src/app/features/users/current-user.state"
import { userDefaults } from "src/app/features/users/user.defaults"
import { UsersLoaderService } from "src/app/features/users/users-loader.service"
import { User } from "src/app/features/users/users.interface"
import { Chat } from "src/generated-gql-types"
import { MessagesLoader } from "../../messages/messages-loader.service"
import { ExtendedChat } from "./chat.interface"

@Injectable({
  providedIn: "root"
})
export class ExtendedChatsFieldsResolver {
  private currentUserId: string | null = this.currentUserState.getUserIdOrNul()

  constructor(
    private usersLoader: UsersLoaderService,
    private messagesLoader: MessagesLoader,
    private currentUserState: CurrentUserState
  ) {}

  async resolveChatNameAndAvatar(chat: Chat): Promise<ExtendedChat> {
    const peerId = this.getChatPeerId(chat)

    const { data: peer } = await this.usersLoader.loadUserResponse({ id: peerId })

    const chatName = peer?.name ?? userDefaults.name
    const chatImage = peer?.avatarUrl as string | undefined

    return { ...chat, chatName, chatImage }
  }

  async resolveLastMessage(chat: ExtendedChat): Promise<ExtendedChat> {
    const { data: lastMessage } = await this.messagesLoader.getLastMessageResponse(chat.id)

    const lastText = lastMessage?.text

    return { ...chat, lastMessage: lastText }
  }

  getChatPeerId(chat: Chat): string {
    const currentUserId = this.currentUserId!

    const otherPeers = chat.peersIds.filter(peerId => peerId !== currentUserId)
    const peerId = otherPeers[0] ?? currentUserId

    return peerId
  }
}
