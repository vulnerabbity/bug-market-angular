import { Component, EventEmitter, Input, Output } from "@angular/core"
import { ExtendedChat } from "src/app/features/chat/chats/chat.interface"

@Component({
  selector: "concrete-chat__header[chat]",
  templateUrl: "./concrete-chat-navbar.component.html",
  styleUrls: ["./concrete-chat-navbar.component.scss"]
})
export class ConcreteChatHeader {
  @Input()
  chat!: ExtendedChat

  @Output("onBackClick")
  private backButtonEmitter = new EventEmitter<void>()

  onBackClick() {
    this.backButtonEmitter.emit()
  }
}
