import { Component, Input } from "@angular/core"
import { AppPathsEnum } from "src/app/app/app-routing.module"
import { ExtendedChat } from "src/app/features/chat/chats/chat.interface"

@Component({
  selector: "common-chats-container",
  templateUrl: "./chats-container.component.html",
  styleUrls: ["./chats-container.component.scss"]
})
export class CommonChatContainerComponent {
  @Input()
  chats: ExtendedChat[] = []

  getChatReference(chatId: string): string {
    return `/${AppPathsEnum.ConcreteChat}/${chatId}`
  }
}
