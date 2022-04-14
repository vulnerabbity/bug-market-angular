import { NgModule } from "@angular/core"
import { ChatsLoaderService } from "./chats-loader.service"
import { ChatsState } from "./chats.state"
import { ConcreteChatLoader } from "./concrete-chat-loader.service"
import { ConcreteExtendedChatLoader } from "./concrete-extended-chat-loader.service"
import { ExtendedChatsLoader } from "./extended-chats-loader.service"

@NgModule({
  providers: [
    ChatsLoaderService,
    ExtendedChatsLoader,
    ConcreteChatLoader,
    ConcreteExtendedChatLoader,
    ChatsState
  ]
})
export class ChatsModule {}
