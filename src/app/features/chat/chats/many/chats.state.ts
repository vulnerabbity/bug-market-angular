import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { Pagination } from "src/generated-gql-types"
import { PaginatedExtendedChats } from "./chat.interface"
import { ExtendedChatsLoader } from "./extended-chats-loader.service"

@Injectable({ providedIn: "root" })
export class ChatsState {
  chats$ = new BehaviorSubject<PaginatedExtendedChats>({ data: [], totalResultsCount: 0 })

  constructor(private chatsLoader: ExtendedChatsLoader) {
    this.fetch()
  }

  setItem(input: PaginatedExtendedChats): void {
    this.chats$.next(input)
  }

  async fetch(pagination?: Pagination) {
    const newChats = await this.chatsLoader.loadOwnExtendedChats(pagination)
    this.setItem(newChats)
  }
}
