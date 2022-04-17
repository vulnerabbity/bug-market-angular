import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { filter, firstValueFrom, map } from "rxjs"
import { ExtendedChat } from "src/app/features/chat/chats/chat.interface"
import { CurrentChatState } from "src/app/features/chat/chats/current-chat.state"
import { ChatEvents } from "src/app/features/chat/notifications/chat.events"

@Component({
  templateUrl: "./concrete-chat.page.html",
  styleUrls: ["./concrete-chat.page.scss"]
})
export class ConcreteChatPage implements OnInit {
  constructor(
    private chatState: CurrentChatState,
    private currentRoute: ActivatedRoute,
    private chatEvents: ChatEvents
  ) {}

  ngOnInit() {
    this.initChat()
  }

  private async initChat() {
    const chatId = await this.getChatId()
    this.chatState.init(chatId)

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
}
