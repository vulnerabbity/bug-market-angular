import { Component, OnDestroy, OnInit } from "@angular/core"
import {
  ExtendedChat,
  PaginatedExtendedChats
} from "src/app/features/chat/chats/many/chat.interface"
import { ChatsState } from "src/app/features/chat/chats/many/chats.state"

@Component({
  templateUrl: "./chats-list.page.html",
  styleUrls: ["./chats-list.page.scss"]
})
export class ChatsListPage implements OnInit, OnDestroy {
  paginatedChats: PaginatedExtendedChats = { data: [], totalResultsCount: 0 }

  chatsSub = this.subscribeToChats()

  constructor(private chatsState: ChatsState) {}

  ngOnInit(): void {
    this.chatsState.fetch()
  }

  ngOnDestroy(): void {
    this.chatsState.destroy()
  }

  getChatsNumber() {
    return this.getChats().length
  }

  getChats(): ExtendedChat[] {
    return this.paginatedChats.data
  }

  private subscribeToChats() {
    return this.chatsState.chats$.subscribe(paginatedChats => {
      this.paginatedChats = paginatedChats
    })
  }
}
