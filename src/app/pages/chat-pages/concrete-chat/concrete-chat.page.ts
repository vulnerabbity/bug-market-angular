import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { firstValueFrom, map } from "rxjs"
import { CurrentChatState } from "src/app/features/chat/chats/current-chat.state"

@Component({
  templateUrl: "./concrete-chat.page.html",
  styleUrls: ["./concrete-chat.page.scss"]
})
export class ConcreteChatPage implements OnInit {
  currentChatId!: string

  constructor(private chatState: CurrentChatState, private currentRoute: ActivatedRoute) {}

  ngOnInit() {
    this.initChat()
  }

  private async initChat() {
    await this.loadChatId()
    this.chatState.init(this.currentChatId)
  }

  private async loadChatId(): Promise<void> {
    const chatId$ = this.currentRoute.params.pipe(map(params => params["id"]))
    const chatId = await firstValueFrom(chatId$)
    this.currentChatId = chatId
  }
}
