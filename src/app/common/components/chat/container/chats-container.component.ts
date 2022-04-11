import { Component, Input } from "@angular/core"
import { Chat } from "src/app/features/chat/chats/chat.interface"

@Component({
  selector: "common-chats-container",
  templateUrl: "./chats-container.component.html",
  styleUrls: ["./chats-container.component.scss"]
})
export class CommonChatContainerComponent {
  @Input()
  chats: Chat[] = []
}
