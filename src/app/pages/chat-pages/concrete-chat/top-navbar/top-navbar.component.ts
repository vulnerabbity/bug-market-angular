import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core"
import { CurrentChatState } from "src/app/features/chat/chats/concrete/current-chat.state"
import { ExtendedChat } from "src/app/features/chat/chats/many/chat.interface"

@Component({
  selector: "concrete-chat__top-navbar",
  templateUrl: "./top-navbar.component.html",
  styleUrls: ["./top-navbar.component.scss"]
})
export class TopNavbarComponent implements OnDestroy {
  chat: ExtendedChat | null = null

  chatSubscription = this.chatState.chat$.subscribe(chat => (this.chat = chat))

  constructor(private chatState: CurrentChatState) {}

  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe()
  }

  onBackClick() {
    this.chatState.quit()
  }
}
