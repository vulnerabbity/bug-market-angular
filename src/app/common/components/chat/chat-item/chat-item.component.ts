import { Component, Input } from "@angular/core"
import { Chat } from "src/app/features/chat/chats/chat.interface"
import { assetsPaths } from "src/assets/assets.paths"

@Component({
  selector: "common-chat-item[chat]",
  templateUrl: "./chat-item.component.html",
  styleUrls: ["./chat-item.component.scss"]
})
export class CommonChatItemComponent {
  @Input()
  chat!: Chat

  getChatImage() {
    return this.chat.chatImage ?? assetsPaths.NoAvatar
  }
}
