import { Component, EventEmitter, Input, Output } from "@angular/core"
import { ExtendedChat } from "src/app/features/chat/chats/chat.interface"

@Component({
  selector: "concrete-chat__top-navbar[chat]",
  templateUrl: "./top-navbar.component.html",
  styleUrls: ["./top-navbar.component.scss"]
})
export class TopNavbarComponent {
  @Input()
  chat!: ExtendedChat

  @Output("onBackClick")
  private backButtonEmitter = new EventEmitter<void>()

  onBackClick() {
    this.backButtonEmitter.emit()
  }
}
