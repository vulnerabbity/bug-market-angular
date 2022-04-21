import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { filter, firstValueFrom, map } from "rxjs"
import { AppRouterService } from "src/app/common/services/router.service"
import { CurrentChatState } from "src/app/features/chat/chats/concrete/current-chat.state"
import { ExtendedChat } from "src/app/features/chat/chats/many/chat.interface"
import { ChatEvents } from "src/app/features/chat/notifications/chat.events"

@Component({
  templateUrl: "./concrete-chat.page.html",
  styleUrls: ["./concrete-chat.page.scss"]
})
export class ConcreteChatPage implements OnInit, OnDestroy {
  private onDeleteSub = this.handleDelete()

  constructor(
    private chatState: CurrentChatState,
    private currentRoute: ActivatedRoute,
    private chatEvents: ChatEvents,
    private appRouter: AppRouterService
  ) {}

  ngOnInit() {
    this.initChat()
  }

  ngOnDestroy(): void {
    this.chatState.quit()
    this.onDeleteSub.unsubscribe()
  }

  private async initChat() {
    const chatId = await this.getChatId()
    await this.chatState.init(chatId)

    const fetchedChat$ = this.chatState.chat$.pipe(
      filter(chat => chat !== null),
      map(chat => chat!)
    )
    const chat = await firstValueFrom(fetchedChat$)

    this.emitChatOpened(chat)
  }

  private async getChatId(): Promise<string> {
    const chatId$ = this.currentRoute.params.pipe(map(params => params["id"]))
    const chatId = await firstValueFrom(chatId$)
    return chatId
  }

  private async emitChatOpened(chat: ExtendedChat) {
    this.chatEvents.chatOpened$.next(chat)
  }

  private handleDelete() {
    return this.chatEvents.chatDeleted$.subscribe(() => {
      this.appRouter.redirectToChats()
    })
  }
}
