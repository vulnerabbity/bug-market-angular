import { Injectable, OnDestroy } from "@angular/core"
import { firstValueFrom, map, Observable, pluck, tap } from "rxjs"
import { Chat, GetChatsPaginatedGQL, PaginatedChats, Pagination } from "src/generated-gql-types"
import { CurrentUserState } from "../../users/current-user.state"
import { userDefaults } from "../../users/user.defaults"
import { UsersLoaderService } from "../../users/users-loader.service"
import { User } from "../../users/users.interface"
import { MessagesLoader } from "../messages/messages-loader.service"
import { ExtendedChat, PaginatedExtendedChats } from "./chat.interface"
import { ChatsLoaderService } from "./chats-loader.service"

@Injectable({ providedIn: "root" })
export class ExtendedChatsLoader implements OnDestroy {
  private currentUser!: User | null

  private currentUserSubscription = this.currentUserState.item$.subscribe(
    currentUser => (this.currentUser = currentUser)
  )

  constructor(
    private usersLoader: UsersLoaderService,
    private messagesLoader: MessagesLoader,
    private currentUserState: CurrentUserState,
    private chatsLoader: ChatsLoaderService
  ) {}

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }

  async loadOwnExtendedChats(pagination?: Pagination): Promise<PaginatedExtendedChats> {
    const paginatedBasicChats = await this.chatsLoader.loadOwnChats(pagination)
    const { data: basicChats, totalResultsCount } = paginatedBasicChats

    const extendedChats: ExtendedChat[] = []
    for (let basicChat of basicChats) {
      let chat = await this.resolveChatNameAndAvatar(basicChat)
      chat = await this.resolveLastMessage(chat)
      extendedChats.push(chat)
    }

    return { totalResultsCount, data: extendedChats }
  }

  private async resolveChatNameAndAvatar(chat: Chat): Promise<ExtendedChat> {
    const peerId = this.getChatPeerId(chat)

    const { data: peer } = await this.usersLoader.loadUserResponse({ id: peerId })

    const chatName = peer?.name ?? userDefaults.name
    const chatImage = peer?.avatarUrl as string | undefined

    return { ...chat, chatName, chatImage }
  }

  private async resolveLastMessage(chat: ExtendedChat): Promise<ExtendedChat> {
    const { data: lastMessage } = await this.messagesLoader.getLastMessageResponse(chat.id)

    const lastText = lastMessage?.text

    return { ...chat, lastMessage: lastText }
  }

  private getChatPeerId(chat: Chat): string {
    const currentUserId = this.currentUser!.id
    const otherPeers = chat.peersIds.filter(peerId => peerId !== currentUserId)
    const peerId = otherPeers[0] ?? currentUserId

    return peerId
  }
}
