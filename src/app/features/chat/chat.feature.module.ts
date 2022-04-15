import { NgModule } from "@angular/core"
import { ChatsModule } from "./chats/chats.module"
import { CurrentChatState } from "./current-chat.state"
import { ChatMessagesModule } from "./messages/messages.module"

@NgModule({
  imports: [ChatMessagesModule, ChatsModule],
  providers: [CurrentChatState]
})
export class ChatFeatureModule {}
