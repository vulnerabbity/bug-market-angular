import { Component } from "@angular/core"
import {
  ExtendedChat,
  PaginatedExtendedChats
} from "src/app/features/chat/chats/many/chat.interface"
import { ChatsState } from "src/app/features/chat/chats/many/chats.state"

@Component({
  templateUrl: "./chats-list.page.html",
  styleUrls: ["./chats-list.page.scss"]
})
export class ChatsListPage {
  paginatedChats: PaginatedExtendedChats = { data: [], totalResultsCount: 0 }

  chatsSubscription = this.chatsState.chats$.subscribe(paginatedChats => {
    this.paginatedChats = paginatedChats
  })

  constructor(private chatsState: ChatsState) {}

  getChatsNumber() {
    return this.getChats().length
  }

  getChats(): ExtendedChat[] {
    return this.paginatedChats.data
  }
}
