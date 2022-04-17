import { NgModule } from "@angular/core"
import { ChatsLoaderService } from "./chats-loader.service"
import { ChatsState } from "./chats.state"
import { ConcreteChatEventsHandler } from "./concrete-chat-events-handler.service"
import { ConcreteChatLoader } from "./concrete-chat-loader.service"
import { ConcreteChatsUpdaterService } from "./concrete-chat-updater.service"
import { ConcreteExtendedChatLoader } from "./concrete-extended-chat-loader.service"
import { CurrentChatState } from "./current-chat.state"
import { ExtendedChatsLoader } from "./extended-chats-loader.service"

@NgModule({
  providers: [
    ChatsLoaderService,
    ExtendedChatsLoader,
    ConcreteChatLoader,
    ConcreteExtendedChatLoader,
    ConcreteChatsUpdaterService,
    ChatsState,
    CurrentChatState,
    ConcreteChatEventsHandler
  ]
})
export class ChatsModule {
  constructor(private concreteChatEventHandler: ConcreteChatEventsHandler) {
    this.concreteChatEventHandler.startHandling()
  }
}
