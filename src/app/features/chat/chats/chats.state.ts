import { Injectable } from "@angular/core"
import { BehaviorSubject, from, Observable } from "rxjs"
import { ReactiveState } from "src/app/common/interfaces/state.interface"
import { Pagination } from "src/generated-gql-types"
import { ExtendedChat, PaginatedExtendedChats } from "./chat.interface"
import { ChatsLoaderService } from "./chats-loader.service"
import { ExtendedChatsLoader } from "./extended-chats-loader.service"

@Injectable({ providedIn: "root" })
export class ChatsState implements ReactiveState<PaginatedExtendedChats> {
  subject$ = new BehaviorSubject<PaginatedExtendedChats>({ data: [], totalResultsCount: 0 })

  item$: Observable<PaginatedExtendedChats> = from(this.subject$)

  constructor(private chatsLoader: ExtendedChatsLoader) {
    this.fetch()
  }

  setItem(input: PaginatedExtendedChats): void {
    this.subject$.next(input)
  }

  async fetch(pagination?: Pagination) {
    const newChats = await this.chatsLoader.loadOwnExtendedChats(pagination)
    this.setItem(newChats)
  }
}
